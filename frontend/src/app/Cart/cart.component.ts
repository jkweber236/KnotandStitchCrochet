import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = null;
  cartId: string | null = null;
  cartItems: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        this.authService
          .fetchUserCart(user.uid)
          .then((cartId) => {
            this.cartId = cartId;
            return this.authService.getCartItems(cartId);
          })
          .then((cart) => {
            this.cart = cart;
            const tempCartItems: any[] = []; // Temporary array
            for (let item of cart.items) {
              this.authService
                .getProductDetails(item.item)
                .then((product) => {
                  tempCartItems.push({ ...product, quantity: item.quantity });
                  // Replace cartItems only after all details are fetched
                  if (tempCartItems.length === cart.items.length) {
                    this.cartItems = tempCartItems;
                  }
                })
                .catch((error) => {
                  console.error('Error fetching product details:', error);
                });
            }
          })
          .catch((error) => {
            console.error('Error fetching cart:', error);
          });
      }
    });
  }

  removeFromCart(itemId: string) {
    if (!this.cartId) return; // Ensure cartId exists

    this.authService
      .removeFromCart(this.cartId, itemId)
      .then(() => {
        // Filter out the removed item from the cartItems array
        this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
        console.log(`Item with id ${itemId} removed from cart`);
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
