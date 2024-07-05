import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-join-game',
  template: `
    <input [(ngModel)]="gameId" placeholder="Enter Game ID" />
    <button (click)="joinGame()">Join Game</button>
    <div *ngIf="message">{{ message }}</div>

    <h3>Parties disponibles :</h3>
    <ul *ngIf="availableGames">
      <li *ngFor="let game of availableGames">
        ID: {{ game.id }}, Joueurs: {{ game.players.length }}
        <button (click)="joinGame(game.id)">Rejoindre</button>
      </li>
    </ul>
  `,
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  gameId: string = '';
  message: string = '';
  availableGames: any[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.messages.subscribe((message) => {
      if (message.action === 'availableGames') {
        this.availableGames = Object.values(message.games);
      } else if (message.action === 'gameJoined') {
        this.message = `Partie rejointe avec ID: ${message.gameId}`;
      } else if (message.action === 'error') {
        this.message = `Erreur: ${message.message}`;
      } else if (message.action === 'playerJoined') {
        this.message = `Un autre joueur a rejoint la partie avec ID: ${message.gameId}`;
      }
    });

    // Demander la liste des parties disponibles au chargement du composant
    console.log(42);
    this.websocketService.sendMessage({ action: 'getAvailableGames' });
  }

  joinGame(gameId: string = this.gameId) {
    if (gameId) {
      this.websocketService.sendMessage({ action: 'joinGame', gameId });
    } else {
      this.message = 'Veuillez entrer un ID de partie valide.';
    }
  }
}
