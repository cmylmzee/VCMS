import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateCartStatus() {
    throw new Error('Method not implemented.');
  }

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>(); // subject is a subclass of observabla yani paylaşırken kodda subscriberlara gidecek .
  totalQuantitiy: Subject<number> = new Subject<number>(); // subject is a subclass of observabla yani paylaşırken kodda subscriberlara gidecek .



  constructor() { }



  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart

    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem(new Product());

    if (this.cartItems.length > 0) {

      // find the item in the cart base on item id


      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }


      // check if we found it

      alreadyExistInCart = (existingCartItem.id != null);

    }


    if (alreadyExistInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    

    // compute cart total price and total quantity

    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... al subsrcibers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantitiy.next(totalQuantityValue)

    // log cart data just for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
    

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name : ${tempCartItem.name}, quantity : ${tempCartItem.quantity} unitPrice : ${tempCartItem.unitPrice}`);
    }

    console.log(`totalPrice :  ${totalPriceValue.toFixed(2)}`);
    console.log(`totalQuantity :  ${totalQuantityValue}`);

    console.log("---------")

  }

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity === 0 ){
      this.remove(theCartItem);

    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id)

    // if found remove the item from the cart

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();

    }
  }




}
