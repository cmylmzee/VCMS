import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
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



  countries: Country[] = [];
  states: State[] = [];


  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  degisken !: string;


  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private vcmsFormService: VcmsFormService,
    private router: Router) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          email: new FormControl('',
            [Validators.required, Validators.pattern('^[a-z-9._%+-]+@[a-z-0-9.-]+\\.[a-z]{2-4}$')]),
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

    // pOUPLATE CREDID CARD YEARS

    this.vcmsFormService.getCreditCardYears().subscribe(
      data => {
        console.log(" creditCardYears" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // POPULATE COUNTRIES

    this.vcmsFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )



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

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstname');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
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
      this.billingAddressStates = this.shippingAddressStates;


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


  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.vcmsFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }


        // select first item by default

        formGroup?.get('state')?.setValue(data[0]);

      }

    )


  }

}
