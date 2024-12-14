import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  product!: Product; // To store a single product
  errorMessage: string = ''; // To display errors if any
  successMessage: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get product ID from the route parameter
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching product:', error);
          this.errorMessage = 'Could not load product details.';
        },
      );
    }
  }

  addToCart(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'You must be logged in to add items to the cart.';
      return;
    }

    // Ensure cart exists or fetch it if not
    this.authService
      .fetchUserCart(userId)
      .then((cartId) => {
        this.authService
          .addToCart(cartId, this.product._id, 1)
          .then(() => {
            this.successMessage = 'Item added to your cart successfully!';
          })
          .catch((error) => {
            this.errorMessage = 'Failed to add item to the cart.';
            console.error('Error adding to cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching user cart:', error);
        this.errorMessage = 'Failed to retrieve or create the cart.';
      });
  }
}
