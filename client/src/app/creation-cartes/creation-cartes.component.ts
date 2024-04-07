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

  nomNouvelleCarte: {theme: string, questions: { niveau: number, question: string, reponse: string }[] } = {theme: '', questions: []};
  categorieSelectionne: string = "";
  nouvelleCategorie: { nom: string, cartes: { theme: string, questions: { niveau: number, question: string, reponse: string }[] }[] } = { nom: '', cartes: [] };
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

    for (let i = 0; i < 12; i++) {
      this.nomNouvelleCarte.questions.push({
        niveau: i + 1,
        question: "",
        reponse: ""
      });
    }
    
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

  ajouterCarteACategorie(catID: string): void{
    if(this.nomNouvelleCarte.theme.trim() === ''){
      alert("Veuillez entrer un nom pour le thème");
      return;
    }

    const nouvelleCarte = {
      theme: this.nomNouvelleCarte.theme,
      questions: [] as { niveau: number; question: string; reponse: string; }[]
    };
    
    for (let i = 0; i < 12; i++) {
      nouvelleCarte.questions.push({
        niveau: i + 1,
        question: "",
        reponse: ""
      });
    }
    

    this.cardService.addCardsToCategory(catID, nouvelleCarte).subscribe(
      (response) => {
        this.nomNouvelleCarte.theme = '';
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
        alert('Une erreur s\'est produite lors de l\'ajout de la carte.');
      }
    )
  }

  supprimerCategorie(catId: string): void{
    this.cardService.deleteCategory(catId).subscribe(
      (response) => {
        alert("categorie supprimée");
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
        console.log(error)
        alert("la suppression n'a pas marché : " + error);
      }
    )
  }

  
}
