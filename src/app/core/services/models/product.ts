// src/app/core/models/product.ts

export interface Store {
  id: number;
  owner_id: number;
  name: string; // [cite: 46]
  status: 'OPEN' | 'CLOSED'; // [cite: 46]
}

export interface Category {
  id: number;
  name: string; // [cite: 49]
  parent_id?: number | null; // Alt kategoriler için [cite: 49]
}

export interface Product {
  id: number;
  store_id?: number; // [cite: 48]
  category_id?: number; // [cite: 48]
  sku?: string; // [cite: 48]
  name: string; // [cite: 48]
  unit_price?: number; // [cite: 48]
  price: number; // [cite: 48]
  image_url: string; // [cite: 48]
  Category: string; // [cite: 48]
  stock: number; // [cite: 48]
  description: string; // [cite: 48]
}

export interface Review {
  id: number;
  user_id: number; // [cite: 49]
  product_id: number; // [cite: 49]
  star_rating: number; // [cite: 49]
  sentiment?: string; // [cite: 49]
}
