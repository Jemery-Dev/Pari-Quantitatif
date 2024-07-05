import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  public messages: Subject<any>;
  private socketOpened: Promise<void>;

  constructor() {
    this.messages = new Subject<any>();
    this.socketOpened = new Promise((resolve, reject) => {
      this.connect(resolve, reject);
    });
  }

  private connect(resolve: () => void, reject: () => void) {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
      resolve();
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.next(message);
    };

    this.socket.onclose = (event) => {
      console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
      reject();
    };
  }

  public async sendMessage(message: any) {
    await this.socketOpened;  // Attendre que la promesse soit résolue avant d'envoyer le message
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open');
    }
  }
}
