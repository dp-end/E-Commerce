import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order, OrderItem } from '../../../core/services/models/order';
import { Product } from '../../../core/services/models/product';

interface OrderWithItems extends Order {
  items: OrderItem[];
  products: Product[];
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory {
  private mockOrders = signal<OrderWithItems[]>([
    {
      id: 1,
      user_id: 1,
      store_id: 1,
      status: 'DELIVERED',
      grand_total: 450.50,
      date: '2026-03-01T10:30:00Z',
      items: [
        { id: 1, order_id: 1, product_id: 1, quantity: 2, price: 150.00 },
        { id: 2, order_id: 1, product_id: 2, quantity: 1, price: 150.50 }
      ],
      products: [
        { id: 1, name: 'Wireless Headphones', price: 150.00, image_url: 'assets/headphones.jpg', Category: 'Electronics', stock: 10, description: 'High quality wireless headphones' },
        { id: 2, name: 'USB Cable', price: 150.50, image_url: 'assets/cable.jpg', Category: 'Electronics', stock: 50, description: 'Durable USB-C cable' }
      ]
    },
    // ... (Keep the rest of your mock data here)
  ]);

  orders = this.mockOrders.asReadonly();
  expandedOrderId = signal<number | null>(null);
  selectedStatus = signal<string | null>(null);

  filteredOrders = computed(() => {
    const status = this.selectedStatus();
    if (!status) return this.orders();
    return this.orders().filter(order => order.status === status);
  });

  statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  getOrderCountByStatus(status: string): number {
    return this.orders().filter(o => o.status === status).length;
  }

  calculateOrderTotal(order: OrderWithItems): number {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // --- NEW SAFE SEARCH METHOD ---
  getProduct(order: OrderWithItems, productId: number): Product | undefined {
    return order.products.find(p => p.id === productId);
  }

  toggleOrderDetails(orderId: number) {
    this.expandedOrderId.update(id => id === orderId ? null : orderId);
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'badge-warning',
      'PROCESSING': 'badge-info',
      'SHIPPED': 'badge-primary',
      'DELIVERED': 'badge-success',
      'CANCELLED': 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'Bekleniyor',
      'PROCESSING': 'İşleniyor',
      'SHIPPED': 'Gönderildi',
      'DELIVERED': 'Teslim Edildi',
      'CANCELLED': 'İptal Edildi'
    };
    return statusMap[status] || status;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
