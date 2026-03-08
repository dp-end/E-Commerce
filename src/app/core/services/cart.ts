import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from './models/product';
import { CartItem } from './models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Sepetteki ürünleri tutan ana Signal
  private cartItems = signal<CartItem[]>(this.loadFromLocalStorage());

  // Toplam ürün sayısı (Sepet ikonundaki sayı için)
  cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  // Toplam fiyat
  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  // Sepet listesi (Dışarıdan sadece okunabilir olması için)
  items = this.cartItems.asReadonly();

  constructor() {
    // Sepet her değiştiğinde otomatik olarak localStorage'a kaydet
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      // Ürün varsa miktarını artır
      this.cartItems.update(items =>
        items.map(item => item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        )
      );
    } else {
      // Ürün yoksa yeni ekle
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== Number(productId)));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items =>
      items.map(item => item.product.id === Number(productId) ? { ...item, quantity } : item)
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }

  private loadFromLocalStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
