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
    this.reset();
  }

  generatePDF() {
    // recuperation de toutes les valeurs que j'aurai besoin pour la génération de PDF ou création du picto
    this.editionService.policeSize = Number(this.policeSize);
    this.editionService.police = this.police;
    console.log('policeColor : ', this.editionService.policeColor);
    console.log('transformation : ', this.transformationValue);
    this.editionService.typeOfBorder = this.typeOfBorder;
    this.editionService.borderSize = Number(this.borderSize);
    console.log('borderColor : ', this.editionService.curentBorderColor);
    console.log('location : ', this.location);
    this.editionService.location = this.location;
    this.router.navigate(['/print']);
  }

  transformation(buton: MatRadioButton) {
    this.transformationValue = buton.value;
    this.editionService.transformationValue = this.transformationValue;
    switch (this.transformationValue){
      case 'aucun':
        this.editionService.wordsText = JSON.parse(JSON.stringify(this.editionService.wordsTextSave));
        break;
      case 'minuscule':
        this.editionService.wordsText.forEach(list => {list.text = list.text.toLowerCase()});
        break;
      case 'majuscule':
        this.editionService.wordsText.forEach(list => {list.text = list.text.toUpperCase()});
        break;
      case 'capitale':
        break;
      default:
        break;
    }
  }

  numberOfPictoPerLines(buton: MatRadioButton) {
    this.numberOfCols = Number(buton.value);
    this.editionService.numberOfCols = this.numberOfCols;
  }

  wordLocation(buton: MatRadioButton) {
    this.location = buton.value;
    this.editionService.location = this.location;
  }

  reset(){
    this.numberOfCols = 2;
    this.police = 'Arial';
    this.typeOfBorder = 'solid';
    this.policeSize = "16";
    this.borderSize = "5";
    this.transformationValue = "aucun";
    this.location = "dans";
  }
}
