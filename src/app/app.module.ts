import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationCartesComponent } from './creation-cartes/creation-cartes.component';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CreationCartesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
