import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable(); // Observable for components to subscribe to

  constructor() {}

  // Method to toggle authentication state
  toggleAuth() {
    this.authenticatedSubject.next(!this.authenticatedSubject.value); // Toggle the current value
  }

  // Optional: method to get current authentication state
  getAuthState(): boolean {
    return this.authenticatedSubject.value; // Get current authentication state
  }

}
