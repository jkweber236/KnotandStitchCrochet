import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  http = inject(HttpClient);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) => {
      // Update the Firebase user profile with username
      return updateProfile(response.user, { displayName: username }).then(
        () => {
          // After successfully registering and updating profile, send the UID to the backend
          return this.createUserAndCart(response.user.uid, email, username);
        },
      );
    });

    return from(promise).pipe(map(() => {}));
  }

  // New method to send UID to the backend to create user profile and cart
  createUserAndCart(uid: string, email: string, username: string) {
    // Create the cart first
    return this.http
      .post<{ insertedId: string }>('http://localhost:5000/carts', { uid }) // Cart creation endpoint
      .toPromise()
      .then((cartResponse) => {
        if (!cartResponse || !cartResponse.insertedId) {
          throw new Error('Failed to create cart or retrieve cart ID');
        }

        const cartId = cartResponse.insertedId; // Extract the cart ID from the response
        // Create the user and associate the cart ID
        return this.http
          .post('http://localhost:5000/users', { uid, email, username, cartId }) // User creation endpoint
          .toPromise();
      });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  fetchUserCart(uid: string): Promise<any> {
    return this.http
      .get<{ cartId: string }>(`http://localhost:5000/users/${uid}`)
      .toPromise()
      .then((userData) => {
        if (userData && userData.cartId) {
          return userData.cartId;
        } else {
          throw new Error('User cart not found.');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user cart:', error);
        throw error;
      });
  }

  getCartItems(cartId: string): Promise<any> {
    return this.http
      .get(`http://localhost:5000/carts/${cartId}`)
      .toPromise()
      .catch((error) => {
        console.error('Error fetching cart:', error);
        throw error;
      });
  }

  getProductDetails(itemId: string): Promise<any> {
    return this.http
      .get(`http://localhost:5000/products/${itemId}`)
      .toPromise()
      .catch((error) => {
        console.error('Error fetching product details:', error);
        throw error;
      });
  }

  addToCart(cartId: string, productId: string, quantity: number): Promise<any> {
    return this.http
      .post(`http://localhost:5000/carts/${cartId}`, { productId, quantity })
      .toPromise()
      .catch((error) => {
        console.error('Error adding item to cart:', error);
        throw error;
      });
  }

  getUserId(): string | null {
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      return currentUser.uid;
    }
    return null;
  }

  removeFromCart(cartId: string, itemId: string): Promise<any> {
    return this.http
      .delete(`http://localhost:5000/carts/${cartId}/${itemId}`)
      .toPromise()
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        throw error;
      });
  }

  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email);
    return from(promise).pipe(map(() => {}));
  }
}
