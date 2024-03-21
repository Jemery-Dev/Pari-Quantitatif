import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';

interface CardData {
  _id: string;
  categories_questions: {
    nom: string;
    cartes: {
      theme: string;
      questions: {
        niveau: number;
        question: string;
        reponse: string;
      }[];
    }[];
  }[];
}

@Component({
  selector: 'app-creation-cartes',
  templateUrl: './creation-cartes.component.html',
  styleUrls: ['./creation-cartes.component.scss']
})
export class CreationCartesComponent implements OnInit {

  cards: CardData[] = [];

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
}
