import { Component, OnInit } from '@angular/core';
import {EditionService} from "../../services/edition-service";

@Component({
  selector: 'app-select-picto',
  templateUrl: './select-picto.component.html',
  styleUrls: ['./select-picto.component.css']
})
export class SelectPictoComponent implements OnInit {

  constructor(public editionService: EditionService) { }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }

  heightImage():string{
    console.log('heightImage', 280 / this.editionService.numberOfCols + 'px');
    return 280 / this.editionService.numberOfCols + 'px';
  }
  widthImage():string{
    return 280 / this.editionService.numberOfCols + 'px';
  }
}
