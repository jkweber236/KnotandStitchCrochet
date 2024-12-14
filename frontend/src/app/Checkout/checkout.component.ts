import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../services/checkout.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  paymentHandler:any = null;
  success: boolean = false;
  failure: boolean = false;

  constructor(private checkout:CheckoutService){} 

  ngOnInit() {
    this.invokeStripe()
  }
  
  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_KEY, 
      locale: 'auto',
      token: (stripeToken: any) => {
        this.success = true;
        this.failure = false;
        this.paymentStripe(stripeToken)
      },
      billingAddress: true,
      shippingAddress:true,
    });


    paymentHandler.open({
      name: "Crochet Product",
      description: "A physical crochet product",
      amount: amount * 100
    })
  }

  paymentStripe = (stripeToken: any) => {
    this.checkout.makePayment(stripeToken).subscribe((data:any) => {

      if (data.data === "success") {
        this.success = true
      } else {
        this.failure = true
      }
    })
  }

  invokeStripe() {
    if (typeof window !== 'undefined') {
      if (!window.document.getElementById('stripe-script')) {
        const script = window.document.createElement('script');
        script.id = 'stripe-script';
        script.type = 'text/javascript';
        script.src = 'http://checkout.stripe.com/checkout.js';
        script.onload = () => {
          this.paymentHandler = (<any>window).StripeCheckout.configure({
            key: environment.STRIPE_KEY,
            locale: 'auto',
            token: (stripeToken: any) => {
            },
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
}