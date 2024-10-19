import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent,CartComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cs:CartService){}
  toggleCart() {
    this.cs.toggleCart();
  }

}
