import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { VcmsFormService } from 'src/app/services/vcms-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup!: FormGroup;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];



  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private vcmsFormService: VcmsFormService,
    private router: Router) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: [''],
        }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],            // BU KISIMDA EĞERKİ ONUR ABİ E TİCARET SİTESİNE DÖN DERSE DİREKT GERÇEK HAYATA UYUMLU BİR SİTEYE DÖNECEĞİM
          country: [''],
          zipCode: [''],
          tableNumber: ['']
        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],            // BU KISIMDA EĞERKİ ONUR ABİ E TİCARET SİTESİNE DÖN DERSE DİREKT GERÇEK HAYATA UYUMLU BİR SİTEYE DÖNECEĞİM
          country: [''],
          zipCode: [''],
          tableNumber: ['']
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],             // BU KISIMDA EĞERKİ ONUR ABİ E TİCARET SİTESİNE DÖN DERSE DİREKT GERÇEK HAYATA UYUMLU BİR SİTEYE DÖNECEĞİM
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: [''],
          tableNumber: ['']
        })

      }
    );


    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth : " + startMonth);

    this.vcmsFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit cart months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.vcmsFormService.getCreditCardYears().subscribe(
      data => {
        console.log(" creditCardYears" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );



    this.reviewCartDetails();

  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    this.cartService.totalQuantitiy.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purcashe - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purcashe - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    //  const shippingState: Statement = JSON.parse(JSON.stringify(purcashe.shippingAddress.state));
    //  const shippingCountry: Country = JSON.parse(JSON.stringify(purcashe.shippingAddress.state));

    // populate purcashe - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    // populate purcashe - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call rest api via the checkoutservice

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Siparişiniz alındı.\nSipariş takip numaranız: ${response.orderTrackingNumber}`);

          // resert cart
          this.resetCart();


        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }

      }
    );







  }
  resetCart() {

    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantitiy.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");

  }

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {


      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);



    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1; // AYLAR 0 DAN BAŞLIYOR ONDAN +1 İ VAR
    }
    else {
      startMonth = 1;
    }

    this.vcmsFormService.getCreditCardMonths(startMonth).subscribe(

      data => {
        console.log("Retrieved credit card months : " + JSON.stringify(data));
        this.creditCardMonths = data;
      }

    )


  }


}
