import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationCartesComponent } from './creation-cartes/creation-cartes.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartesCollectionComponent } from './cartes-collection/cartes-collection.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'creation',
    component: CreationCartesComponent
  },
  {
    path: 'gallerie',
    component: CartesCollectionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  };

