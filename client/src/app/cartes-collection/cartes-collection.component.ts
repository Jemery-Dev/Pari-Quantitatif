import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';

interface CardData {
  _id: string;
  nom: string;
  cartes: {
    theme: string;
    questions: {
      niveau: number;
      question: string;
      reponse: string;
    }[];
  }[];
}

@Component({
  selector: 'app-cartes-collection',
  templateUrl: './cartes-collection.component.html',
  styleUrls: ['./cartes-collection.component.scss']
})
export class CartesCollectionComponent implements OnInit {

  cards: CardData[] = [];
  categorieSelectionne: string = "";
  flippedCards: { [key: string]: boolean } = {};

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getAllCards().subscribe(
      data => {
        this.cards = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  flipCard(category: string, theme: string) {
    const cardKey = `${category}-${theme}`;
    this.flippedCards[cardKey] = !this.flippedCards[cardKey];
  }

  isFlipped(category: string, theme: string): boolean {
    const cardKey = `${category}-${theme}`;
    return !!this.flippedCards[cardKey];
  }

  filteredCards() {
    if (!this.categorieSelectionne) {
      return this.cards.flatMap(card => card.cartes.map(carte => ({ ...carte, nom: card.nom })));
    }
    const selectedCard = this.cards.find(card => card.nom === this.categorieSelectionne);
    return selectedCard ? selectedCard.cartes.map(carte => ({ ...carte, nom: selectedCard.nom })) : [];
  }
}
