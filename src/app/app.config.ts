import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { initializeApp } from "firebase/app";

// Firebase configuration (initialize outside the appConfig)
const firebaseConfig = {
  apiKey: "AIzaSyBCuzVw8DQihbmLvRgi_5VSrsNZ6yGs5pw",
  authDomain: "shopfer-19be5.firebaseapp.com",
  projectId: "shopfer-19be5",
  storageBucket: "shopfer-19be5.appspot.com",
  messagingSenderId: "606811884047",
  appId: "1:606811884047:web:33a572072271edc35fb17a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    ProductService,
    CartService,
    provideHttpClient(),
    AuthService
  ]
};
