import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocketConnection();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocketConnection();
  }

  sendMessage(user: string, message: string): void {
    this.webSocketService.sendWebSocketMessage({ user, message });
  }
}

export class WebSocketChat {
  user: string;
  message: string;

  constructor(user: string, message: string) {
    this.user = user;
    this.message = message;
  }
}
