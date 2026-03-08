import { Injectable, signal, computed } from '@angular/core';
import { User, RoleType } from '../../core/services/models/user'; // Yolun doğruluğunu kontrol edin

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Kullanıcı bilgisini tutan temel Signal
  private currentUser = signal<User | null>(null);

  // Dışarıya açılan salt okunur sinyaller
  user = computed(() => this.currentUser());
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    this.loadUserFromStorage();
  }

  // Giriş işlemi
  login(userData: User) {
    this.currentUser.set(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Çıkış işlemi
  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  // Modeldeki role_type'ı döndürür
  getUserRole(): RoleType | undefined {
    return this.currentUser()?.role_type;
  }

  private loadUserFromStorage() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        this.logout();
      }
    }
  }
}
