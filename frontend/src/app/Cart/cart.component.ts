import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../services/checkout.service';
import { environment } from '../../environments/environment';

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

  paymentHandler: any = null;
  success: boolean = false;
  failure: boolean = false;

  isCheckoutComplete = false;
  purchasedPatterns: string[] = [];

  constructor(private authService: AuthService, private checkout: CheckoutService) {}

  ngOnInit() {
    this.invokeStripe();

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

  makePayment(amount: number) {
    const totalCost = this.getTotalCost();
    const totalItems = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    const description = `You are purchasing ${totalItems} item(s).`;

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_KEY,
      locale: 'auto',
      token: (stripeToken: any) => {
        this.success = true;
        this.failure = false;
        this.paymentStripe(stripeToken)
        this.completeCheckout();
      },
      billingAddress: true,
      shippingAddress: true,
    });

    paymentHandler.open({
      name: 'KnotandStitchCrochet',
      description: description,
      amount: totalCost * 100
    })
  }

  paymentStripe = (stripeToken: any) => {
    this.checkout.makePayment(stripeToken).subscribe((data: any) => {
      if (data.data === 'success') {
        this.success = true;
      } else {
        this.failure = true;
      }
    });
  };

  invokeStripe() {
    if (typeof window !== 'undefined') {
      if (!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement('script');
        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: environment.STRIPE_KEY,
            locale: 'auto',
            token: (stripeToken: any) => {},
            billingAddress: true,
            shippingAddress: true,
          });
        };
        window.document.body.appendChild(script);
      }
    } else {
      console.warn('Stripe is not available in this environment.');
    }
  }

  completeCheckout() {
    this.purchasedPatterns = this.cartItems
      .filter(item => item.isDigital)
      .map(item => item.name);
    this.isCheckoutComplete = true;
  }
}
