import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // AuthService'i enjekte ediyoruz
  private authService = inject(AuthService);

  // Sidebar'ın açık/kapalı durumunu tutan sinyal
  isCollapsed = signal(false);

  // AuthService'deki kullanıcı sinyalini bileşene bağlıyoruz
  // Bu sayede kullanıcı giriş yaptığında veya rolü değiştiğinde
  // sidebar.html otomatik olarak güncellenecektir.
  user = this.authService.user;

  /**
   * Sidebar'ı daraltır veya açar
   */
  toggleSidebar() {
    this.isCollapsed.update(v => !v);
  }
}
