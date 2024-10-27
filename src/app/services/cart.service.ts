import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject to manage cart visibility
  private cartVisibility = new BehaviorSubject<boolean>(false);
  private cartDetails: CartItem[]=[];
  private cartDetailsSubject = new BehaviorSubject<CartItem[]>(this.cartDetails);
  // Observable for components to subscribe to
  cartVisibility$ = this.cartVisibility.asObservable();
  cartDetails$ = this.cartDetailsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // Load cart from localStorage on initialization
  private loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cartDetails') || '[]');
    this.cartDetails = cartData;
    this.cartDetailsSubject.next(this.cartDetails);
  }

  // Method to toggle cart visibility
  toggleCart() {
    this.cartVisibility.next(!this.cartVisibility.value);
  }
  addToCart(cartitem:CartItem){
    const existingItem = this.cartDetails.find(cartItem => cartItem.product.id === cartitem.product.id);
    if (existingItem) {
      existingItem.qte += cartitem.qte;
    } else {
      this.cartDetails.push(cartitem);
    }
    this.cartDetailsSubject.next(this.cartDetails);
    localStorage.setItem('cartDetails', JSON.stringify(this.cartDetails));
  }
  
  getTotal(): number {
    let total: number = 0;
    for (let item of this.cartDetails) { // Use 'for...of' to iterate over array items
      total += item.product.price * item.qte;
    }
    return total;
  }
  
}
