import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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
        }
      );
    }
  }
}
