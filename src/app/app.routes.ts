import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. PUBLIC ROTES (Giriş ve Kayıt İşlemleri)
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/auth/unauthorized/unauthorized').then(m => m.Unauthorized)
  },

  // 2. INDIVIDUAL (Müşteri) ROTALARI
  // İleride buraya canActivate: [AuthGuard, RoleGuard] ekleyeceğiz
  {
    path: 'shop',
    loadComponent: () => import('./features/customer/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/customer/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/customer/cart/cart').then(m => m.Cart)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/customer/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/customer/order-history/order-history').then(m => m.OrderHistory)
  },

  // 3. CORPORATE (Mağaza Sahibi) ROTALARI
  {
    path: 'corporate',
    // Corporate paneli için bir ana layout oluşturursan çocuk rotaları (children) buraya dizebilirsin
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/corporate/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/corporate/inventory/inventory').then(m => m.Inventory)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/corporate/orders/orders').then(m => m.Orders)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/corporate/revenue-reports/revenue-reports').then(m => m.RevenueReports)
      }
    ]
  },

  // 4. ADMIN (Sistem Yöneticisi) ROTALARI
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/user-management/user-management').then(m => m.UserManagement)
      },
      {
        path: 'stores',
        loadComponent: () => import('./features/admin/store-management/store-management').then(m => m.StoreManagement)
      },
      {
        path: 'config',
        loadComponent: () => import('./features/admin/global-config/global-config').then(m => m.GlobalConfig)
      }
    ]
  },

  // 5. AI CHATBOT ROTASI
  // Chatbot tüm roller tarafından kullanılabileceği için ayrı bir rota olabilir [cite: 170, 171]
  {
    path: 'ai-assistant',
    loadComponent: () => import('./features/ai-chat/chat-container/chat-container').then(m => m.ChatContainer)
  },

  // 6. YAKALAYICI (Fallback) ROTA - Sayfa bulunamazsa
  { path: '**', redirectTo: 'shop' }
];
