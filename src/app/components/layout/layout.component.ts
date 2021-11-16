import { Component, OnInit } from '@angular/core';
import {EditionService} from "../../services/edition-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  numberOfLines: any;
  police: string = 'Arial';
  defaultPoliceSize: number = 16;
  defaultBorderSize: number = 5;
  typeOfBorder: any = 'continue';
  policeSize: string = "16";
  borderSize: string = "5";

  constructor(public editionService: EditionService) { }

  ngOnInit(): void {
  }

  generatePDF() {
    // recuperation de toutes les valeurs que j'aurai besoin pour la génération de PDF ou création du picto
    console.log('numberOfLines', this.numberOfLines);
    console.log('bordercolor : ', this.editionService.curentBorderColor);
    console.log('police :', this.police);
    console.log('taille police :', Number(this.policeSize));
    console.log('taille bordure :', Number(this.borderSize));

  }
}
