import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: [''],
          tableNumber: ['']
        })
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
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }



}
