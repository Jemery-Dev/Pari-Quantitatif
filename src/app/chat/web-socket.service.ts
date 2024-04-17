import { Injectable } from "@angular/core";
import { WebSocketChat } from "./chat.component";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  websocket: WebSocket;
  websocketMessage: WebSocketChat[] = [];

  constructor() { }
  
  openWebSocketConnection() {
    console.log("On tente de se connecter")
    this.websocket = new WebSocket('ws://localhost:4200/websocket');
  
    this.websocket.onopen = (e) => {
      console.log("La connexion WebSocket est ouverte");
    }
  
    this.websocket.onmessage = (e) => {
      console.log("Message reçu via WebSocket:", e.data);
      const chatMsg = JSON.parse(e.data);
      this.websocketMessage.push(chatMsg);
    }
  
    this.websocket.onclose = (e) => {
      console.log("La connexion WebSocket est fermée");
    }
  }
  

  sendWebSocketMessage(chatMsg: WebSocketChat) {
    this.websocket.send(JSON.stringify(chatMsg));
  }

  closeWebSocketConnection() {
    this.websocket.close();
  }
}
