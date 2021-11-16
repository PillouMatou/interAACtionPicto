import { Component, OnInit } from '@angular/core';
import {EditionService} from "../../services/edition-service";
import {NgForm} from "@angular/forms";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  numberOfLines: number = 2;
  police: string = 'Arial';
  defaultPoliceSize: number = 16;
  defaultBorderSize: number = 5;
  typeOfBorder: string = 'continue';
  policeSize: string = "16";
  borderSize: string = "5";
  transformationValue: string = "aucun";
  location: string = "dans";

  constructor(public editionService: EditionService) { }

  ngOnInit(): void {
  }

  generatePDF() {
    // recuperation de toutes les valeurs que j'aurai besoin pour la génération de PDF ou création du picto
    console.log('taille police :', Number(this.policeSize));
    console.log('police :', this.police);
    console.log('policeColor : ', this.editionService.policeColor);
    console.log('transformation : ', this.transformationValue);
    console.log('typeOfBorder : ', this.typeOfBorder);
    console.log('taille bordure :', Number(this.borderSize));
    console.log('borderColor : ', this.editionService.curentBorderColor);
    console.log('location : ', this.location);
    console.log('numberOfLines', this.numberOfLines);
  }

  transformation(buton: MatRadioButton) {
    this.transformationValue = buton.value;
  }

  numberOfPictoPerLines(buton: MatRadioButton) {
    this.numberOfLines = Number(buton.value);
  }

  wordLocation(buton: MatRadioButton) {
    this.location = buton.value;
  }
}
