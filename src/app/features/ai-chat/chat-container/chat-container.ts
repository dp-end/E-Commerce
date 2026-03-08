import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chat } from '../services/chat';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.css',
})
export class ChatContainer {
  private chatService = inject(Chat);

  // Sohbet geçmişi
  messages = signal<{sender: 'user' | 'ai', text: string}[]>([
    { sender: 'ai', text: 'Merhaba! Mağazamızdaki ürünler (T-Shirt, Sneakers, Headphones) ile ilgili sana nasıl yardımcı olabilirim?' }
  ]);

  userInput = signal('');
  isLoading = signal(false);

  async onSendMessage() {
    const text = this.userInput().trim();
    if (!text) return;

    // Kullanıcı mesajını ekle
    this.messages.update(msgs => [...msgs, { sender: 'user', text }]);
    this.userInput.set('');
    this.isLoading.set(true);

    // Gemini'den cevap bekle
    const responseText = await this.chatService.sendMessage(text);

    // Gelen cevabı listeye ekle
    this.messages.update(msgs => [...msgs, { sender: 'ai', text: responseText }]);
    this.isLoading.set(false);
  }
}
