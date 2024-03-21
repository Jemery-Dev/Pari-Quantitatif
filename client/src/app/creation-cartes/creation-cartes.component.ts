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
  selector: 'app-creation-cartes',
  templateUrl: './creation-cartes.component.html',
  styleUrls: ['./creation-cartes.component.scss']
})
export class CreationCartesComponent implements OnInit {

  nouvelleCategorie: { nom: string, cartes: {
    push: any; theme: string, questions: { niveau: number, question: string, reponse: string }[] 
}[] } = { nom: '', cartes: [] };
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


  ajouterCategorie(): void {
    if (this.nouvelleCategorie.nom.trim() === '') {
      alert('Veuillez entrer un nom pour la catégorie.');
      return;
    }

    const nouvelleCategorieAvecCartes = {
      nom: this.nouvelleCategorie.nom,
      cartes: []
    };
  
    this.cardService.addCategory(nouvelleCategorieAvecCartes).subscribe(
      (response) => {
        this.nouvelleCategorie.nom = '';
        this.cardService.getAllCards().subscribe(
          data => {
            this.cards = data;
          },
          error => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        alert('Une erreur s\'est produite lors de l\'ajout de la catégorie.');
      }
    );
  }    
}


