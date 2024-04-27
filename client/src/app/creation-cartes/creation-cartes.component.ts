import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  tab: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  @ViewChild('formNomTheme') formNomTheme!: ElementRef;
  @ViewChild('formQuestions') formQuestions!: ElementRef;
  @ViewChild('formReponses') formReponses!: ElementRef;
  @ViewChild('interCarte') interCarte!: ElementRef;

  tourner: boolean = false;



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

  passerAuFormQuestions(catID: string): void {
    if(catID === ''){
      alert("Veuillez choisir une cacatégorie");
      return;
    }

    if(this.nomNouvelleCarte.theme.trim() === ''){
      alert("Veuillez entrer un nom pour le thème");
      return;
    }

    this.formNomTheme.nativeElement.style.opacity = "0";
    this.formNomTheme.nativeElement.style.display = "none";
    this.formQuestions.nativeElement.style.display = "block";
    this.formQuestions.nativeElement.style.opacity = "1";  

  }

  retourNomTheme(): void{
    this.formQuestions.nativeElement.style.display = "none";
    this.formQuestions.nativeElement.style.opacity = "0"; 
    this.formNomTheme.nativeElement.style.opacity = "1";
    this.formNomTheme.nativeElement.style.display = "block"; 
  }

  passerAuFormReponses(): void{
    let questionPasComplete = "";
    this.nomNouvelleCarte.questions.forEach((question, index) => {
      if(question.question === ""){
        questionPasComplete += (index + 1) + ", ";
      }
    })
    if(questionPasComplete !== ""){
      alert("Il faut compléter toutes les questions (question " + questionPasComplete + " pas complété)");
      return;
    }

    this.formQuestions.nativeElement.style.display = "none";
    this.formQuestions.nativeElement.style.opacity = "0"; 
    this.formReponses.nativeElement.style.opacity = "1";
    this.formReponses.nativeElement.style.display = "block";
  }

  retourQuestions(): void{
    this.formReponses.nativeElement.style.opacity = "0";
    this.formReponses.nativeElement.style.display = "none";
    this.formQuestions.nativeElement.style.display = "block";
    this.formQuestions.nativeElement.style.opacity = "1";
  }


  tournerCarte():void{
    if(!this.tourner){
      this.interCarte.nativeElement.style.transform = "rotateY(180deg)";
      this.tourner = true;
    }else{
      this.interCarte.nativeElement.style.transform = "rotateY(0deg)";
      this.tourner = false
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
    let reponsePasComplete = "";
    this.nomNouvelleCarte.questions.forEach((question, index) => {
      if(question.reponse === ""){
        reponsePasComplete += (index + 1) + ", ";
      }
    })
    if(reponsePasComplete !== ""){
      alert("Il faut compléter toutes les réponses (reponse " + reponsePasComplete + " pas complété)");
      return;
    }

    const nouvelleCarte = {
      theme: this.nomNouvelleCarte.theme,
      questions: [] as { niveau: number; question: string; reponse: string; }[]
    };
    
    for (let i = 0; i < 12; i++) {
      nouvelleCarte.questions.push({
        niveau: i + 1,
        question: this.nomNouvelleCarte.questions[i].question,
        reponse: this.nomNouvelleCarte.questions[i].reponse
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
        alert("Carte " + this.nomNouvelleCarte.theme + " ajouter !!");
        location.reload();
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
