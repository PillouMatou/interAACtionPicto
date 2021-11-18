import { Component, OnInit } from '@angular/core';
import {EditionService} from "../../services/edition-service";
import {MatRadioButton} from "@angular/material/radio";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  numberOfCols: number = 2;
  police: string = 'Arial';
  defaultPoliceSize: number = 16;
  defaultBorderSize: number = 5;
  typeOfBorder: string = 'solid';
  policeSize: string = "16";
  borderSize: string = "5";
  transformationValue: string = "aucun";
  location: string = "dans";

  constructor(public editionService: EditionService,
              public router: Router) { }

  ngOnInit(): void {
  }

  generatePDF() {
    // recuperation de toutes les valeurs que j'aurai besoin pour la génération de PDF ou création du picto
    console.log('taille police :', Number(this.policeSize));
    this.editionService.policeSize = Number(this.policeSize);
    console.log('police :', this.police);
    this.editionService.police = this.police;
    console.log('policeColor : ', this.editionService.policeColor);
    console.log('transformation : ', this.transformationValue);
    console.log('typeOfBorder : ', this.typeOfBorder);
    this.editionService.typeOfBorder = this.typeOfBorder;
    console.log('taille bordure :', Number(this.borderSize));
    this.editionService.borderSize = Number(this.borderSize);
    console.log('borderColor : ', this.editionService.curentBorderColor);
    console.log('location : ', this.location);
    console.log('numberOfCols', this.numberOfCols);
    this.router.navigate(['/print']);
  }

  transformation(buton: MatRadioButton) {
    this.transformationValue = buton.value;
  }

  numberOfPictoPerLines(buton: MatRadioButton) {
    this.numberOfCols = Number(buton.value);
    this.editionService.numberOfCols = this.numberOfCols;
  }

  wordLocation(buton: MatRadioButton) {
    this.location = buton.value;
  }
}
