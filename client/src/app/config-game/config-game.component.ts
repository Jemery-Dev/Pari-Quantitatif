/* import { Component } from '@angular/core';

@Component({
  selector: 'app-config-game',
  templateUrl: './config-game.component.html',
  styleUrl: './config-game.component.scss'
})
export class ConfigGameComponent {

}
 */

// src/app/create-game/create-game.component.ts
import { Component } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-config-game',
  template: `
    <button (click)="createGame()">Create Game</button>
    <div *ngIf="gameId">Game ID: {{ gameId }}</div>
  `,
})
export class ConfigGameComponent {
  gameId: string = '';

  constructor(private websocketService: WebsocketService) {
    this.websocketService.messages.subscribe((message) => {
      //console.log('Message reçu dans config-game: ', message);
      if (message.action === 'gameCreated') {
        //console.log('Partie créée avec ID: ', message.gameId);
        this.gameId = message.gameId;
      }
    });
  }

  createGame() {
    this.websocketService.sendMessage({ action: 'createGame' });
  }
}

