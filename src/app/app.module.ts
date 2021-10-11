import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { TranslatePictoComponent } from './components/translate-picto/translate-picto.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IvyCarouselModule} from "angular-responsive-carousel";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TranslatePictoComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        IvyCarouselModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
