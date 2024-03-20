import { Component, OnInit } from '@angular/core';
import * as cartes from '../../data/cartes.json';

@Component({
  selector: 'app-creation-cartes',
  templateUrl: './creation-cartes.component.html',
  styleUrls: ['./creation-cartes.component.scss']
})
export class CreationCartesComponent implements OnInit {

  ure: any = cartes;
  nouvelleCat: string = '';

  ngOnInit(): void {
    console.log('Data', this.ure);
  }

  
}
