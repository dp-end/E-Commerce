// src/app/features/customer/product-detail/product-detail.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/services/models/product';
import { MOCK_PRODUCTS } from '../../../core/services/models/mocks/mock-products';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);

  // Ürün bilgisini tutacak signal
  product = signal<Product | undefined>(undefined);

  ngOnInit() {
    // URL'den 'id' parametresini al
    const productIdParam = this.route.snapshot.paramMap.get('id');

    if (productIdParam) {
      const productId = Number(productIdParam);
      // Şimdilik MOCK_PRODUCTS üzerinden ürünü buluyoruz. İleride API servisi ile değiştirilebilir.
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);

      if (foundProduct) {
        this.product.set(foundProduct);
      }
    }
  }

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct);
      alert(`${currentProduct.name} sepete eklendi!`);
    }
  }

  goBack() {
    this.router.navigate(['/products']); // Ürün listesi rotanıza göre burayı güncelleyebilirsiniz
  }
}
