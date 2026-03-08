import { Component, inject } from '@angular/core';
import { Product } from '../../../core/services/models/product';
import { MOCK_PRODUCTS } from '../../../core/services/models/mocks/mock-products';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { signal } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe , CommonModule , RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private cartService = inject(CartService);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.products.set(MOCK_PRODUCTS);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} sepete eklendi!`);
  }
}
