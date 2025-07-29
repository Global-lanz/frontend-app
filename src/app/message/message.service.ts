import { Injectable, signal } from "@angular/core";

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages = signal<Message[]>([]);
  private nextId = 1;

  setMessage(type: MessageType, text: string) {
    const id = this.nextId++;
    const message: Message = { id, type, text };
    let duration: number;
    if (type === 'success') {
      duration = 3000; // Duration in milliseconds, success messages disappear faster, less important
    } else {
      duration = 10000;
    }
    this.messages.update(msgs => [message, ...msgs]);
    setTimeout(() => this.removeMessage(id), duration);
  }

  removeMessage(id: number) {
    this.messages.update(msgs => msgs.filter(msg => msg.id !== id));
  }

  getMessages() {
    return this.messages.asReadonly();
  }

}