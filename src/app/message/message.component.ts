import { Component, inject, signal } from '@angular/core';
import { MessageService, MessageType } from './message.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  
  messageService = inject(MessageService);

  messages = this.messageService.getMessages();

  getClass(type: MessageType): string {
    switch (type) {
      case 'info': return 'is-info';
      case 'error': return 'is-danger';
      case 'success': return 'is-success';
      case 'warning': return 'is-warning';
      default: return 'is-primary';
    }
  }

  remove(id: number) {
    this.messageService.removeMessage(id);
  }

}
