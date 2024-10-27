import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';  // Import the CartService
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isVisible = true;
  cartDetails: CartItem[]=[];
  totalPrice:number=0;
  constructor(private cs: CartService) {}

  ngOnInit() {
    // Subscribe to the cartVisibility$ to track visibility changes
    this.cs.cartVisibility$.subscribe(visible => {
      this.isVisible = visible;
    });
    this.cs.cartDetails$.subscribe((items: CartItem[]) => {
      this.cartDetails = items;
      this.totalPrice = this.cs.getTotal(); // Recalculate total when the cart changes
    })
  }
  toggleCart() {
    this.cs.toggleCart();
  }

}
