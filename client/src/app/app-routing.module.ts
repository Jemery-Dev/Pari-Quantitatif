import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationCartesComponent } from './creation-cartes/creation-cartes.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ConfigGameComponent } from './config-game/config-game.component';
import { JoinGameComponent } from './join-game/join-game.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'creationCartes',
    component: CreationCartesComponent
  },{
    path: 'config-game',
    component: ConfigGameComponent
  },{
    path: 'join-game',
    component: JoinGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  };

