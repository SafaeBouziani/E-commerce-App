import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,ListProductComponent,FooterComponent,SignUpComponent,CommonModule,SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'shopfer';
  showNavbar = true;

  constructor(private router: Router,private as:AuthService)  {
    this.router.events.subscribe((val) => {
      // Check the current route, and hide the navbar if it's the login page
      this.showNavbar = !(this.router.url.includes('/login')||(this.router.url.includes('/sign-up')));
    });
  }
  ngOnInit(): void {
    this.as.user$.subscribe((user: User | null) => {
      if (user) {
        this.as.currentUserSig.set({
          email:user.email!,
          userName:user.userName!,
        });
      } else {
        this.as.currentUserSig.set(null);
      }
    });
  }
  
}
