import { CartItem } from './../../../core/services/models/cart-item';
import { CartService } from './../../../core/services/cart';
import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  CartService = inject(CartService);

  cartItem = this.CartService.items;
  totalPrice = this.CartService.totalPrice;
  cartCount = this.CartService.cartCount;

  updateQuantity(productId: number, quantity: number) {
    this.CartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.CartService.removeFromCart(productId);
  }
}
