// src/app/core/models/order.ts

export interface Order {
  id: number;
  user_id: number; // [cite: 46]
  store_id: number; // [cite: 46]
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; // [cite: 46]
  grand_total: number; // [cite: 46]
  date?: string; // ISO 8601 formatı için [cite: 54]
}

export interface OrderItem {
  id: number;
  order_id: number; // [cite: 47]
  product_id: number; // [cite: 47]
  quantity: number; // [cite: 47]
  price: number; // [cite: 47]
}

export interface Shipment {
  id: number;
  order_id: number; // [cite: 47]
  warehouse: string; // [cite: 47]
  mode: string; // [cite: 47]
  status: string; // [cite: 47]
}
