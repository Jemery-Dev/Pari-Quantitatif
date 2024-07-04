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

function flipCard(event: { currentTarget: any; }) {
  const card = event.currentTarget;
  card.classList.toggle('flipped');
}

@Component({
  selector: 'app-cartes-collection',
  templateUrl: './cartes-collection.component.html',
  styleUrl: './cartes-collection.component.scss'
})
export class CartesCollectionComponent implements OnInit {

  cards: CardData[] = [];
  categorieSelectionne: string = "";
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

  flipCard(id: string) {
    const card = document.getElementById('card-' + id);
    if (card) {
      card.classList.toggle('flipped');
    }
  }

}
