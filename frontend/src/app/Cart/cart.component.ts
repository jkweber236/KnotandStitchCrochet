import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId: string = '';
  cart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      this.cartId = storedCartId;
      this.getCart();
    }
  }

  getCart() {
    if (this.cartId) {
      this.http.get(`http://localhost:5000/api/cart/${this.cartId}`).subscribe({
        next: (data) => {
          this.cart = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  addToCart(productId: string, quantity: number) {
    const body = { cartId: this.cartId || null, productId, quantity };

    this.http.post('http://localhost:5000/api/cart', body).subscribe({
      next: (data: any) => {
        this.cart = data.cart;
        if (!this.cartId) {
          this.cartId = data.cart.cartId;
          localStorage.setItem('cartId', this.cartId);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService, User } from '@auth0/auth0-angular';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
// })
// export class CartComponent implements OnInit {
//   cart: any;

//   constructor(private http: HttpClient, public auth: AuthService) {}

//   ngOnInit(): void {
//     this.auth.user$.subscribe((user: User | null) => {
//       if (user) {
//         this.getCart();
//       }
//     });
//   }

//   getCart() {
//     this.http.get('http://localhost:3000/api/cart').subscribe({
//       next: (data) => (this.cart = data),
//       error: (err) => console.error(err),
//     });
//   }

//   addToCart(productId: string, quantity: number) {
//     const body = { productId, quantity };

//     this.http.post('http://localhost:3000/api/cart', body).subscribe({
//       next: (data: any) => (this.cart = data.cart),
//       error: (err) => console.error(err),
//     });
//   }
// }
