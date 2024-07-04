import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationCartesComponent } from './creation-cartes/creation-cartes.component';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import {NgOptimizedImage} from "@angular/common";
import { CartesCollectionComponent } from './cartes-collection/cartes-collection.component';


@NgModule({
  declarations: [
    AppComponent,
    CreationCartesComponent,
    HomePageComponent,
    CartesCollectionComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
