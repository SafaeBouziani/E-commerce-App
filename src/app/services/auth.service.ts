import { Injectable,inject } from '@angular/core';
import { BehaviorSubject, Observable,from } from 'rxjs';
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

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
  fireBaseAuth = inject(Auth);
  register (email:string,userName:string,password:string):Observable<void>{
    const promise=createUserWithEmailAndPassword(this.fireBaseAuth,email,password).then((response)=>
      updateProfile(response.user,{displayName:userName}));
    return from(promise);
  }
  login(email:string,password:string):Observable<void>{
    const promise= signInWithEmailAndPassword(
      this.fireBaseAuth,email,password).then(()=>{});
    return from(promise);
  }

}
