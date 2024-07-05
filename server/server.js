// Serveur Node.js (server.js)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Card = require('./cardModel');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://douze:12@pariquantitatifcluster.7lgvzom.mongodb.net/')
  .then(() => console.log('On est connecté à MongoDB'))
  .catch(err => console.log(err));

// WebSocket server
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const games = {};

wss.on('connection', (ws) => {
  console.log('Client connecté');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.action === 'createGame') {
      const gameId = uuidv4();
      games[gameId] = { id: gameId, players: [ws] };
      ws.send(JSON.stringify({ action: 'gameCreated', gameId }));
    } else if (data.action === 'joinGame') {
      const game = games[data.gameId];
      if (game) {
        game.players.push(ws);
        ws.send(JSON.stringify({ action: 'gameJoined', gameId: data.gameId }));
        game.players.forEach(player => {
          if (player !== ws) {
            player.send(JSON.stringify({ action: 'playerJoined', gameId: data.gameId }));
          }
        });
      } else {
        ws.send(JSON.stringify({ action: 'error', message: 'Partie non trouvée' }));
      }
    } else if (data.action === 'getAvailableGames') {
      console.log("les jeux dispos sont : " + games);
      ws.send(JSON.stringify({ action: 'availableGames', games }));
    }
  });

  ws.on('close', () => {
    console.log('Client déconnecté');
    // Gérer la déconnexion du joueur et la suppression du jeu si nécessaire
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur tourne en ${PORT}`));
