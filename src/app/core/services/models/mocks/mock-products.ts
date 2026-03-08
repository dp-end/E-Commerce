import { Product } from '../product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    store_id: 101,
    category_id: 1,
    sku: 'TSHIRT-01',
    name: 'Classic Cotton T-Shirt',
    unit_price: 19.99,
    price: 19.99,
    image_url: 'https://placehold.co/400x400?text=T-Shirt',
    // Added missing properties below:
    Category: 'Clothing',
    stock: 100,
    description: 'A comfortable 100% cotton t-shirt.'
  },
  {
    id: 2,
    store_id: 101,
    category_id: 2,
    sku: 'SNK-PRO',
    name: 'Running Sneakers Pro',
    unit_price: 89.99,
    price: 89.99,
    image_url: 'https://placehold.co/400x400?text=Sneakers',
    // Added missing properties below:
    Category: 'Footwear',
    stock: 45,
    description: 'Professional grade running shoes.'
  },
  {
    id: 3,
    store_id: 102,
    category_id: 3,
    sku: 'WL-HEAD',
    name: 'Wireless Headphones',
    unit_price: 149.99,
    price: 149.99,
    image_url: 'https://placehold.co/400x400?text=Headphones',
    // Added missing properties below:
    Category: 'Electronics',
    stock: 20,
    description: 'Noise-canceling wireless headphones.'
  }
];
