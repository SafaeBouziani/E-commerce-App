import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,ListProductComponent,FooterComponent,SignUpComponent,CommonModule,SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shopfer';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      // Check the current route, and hide the navbar if it's the login page
      this.showNavbar = !this.router.url.includes('/login');
    });
  }
}
