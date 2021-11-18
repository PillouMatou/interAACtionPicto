import { Component, OnInit } from '@angular/core';
import {EditionService} from "../../services/edition-service";
import {PrintService} from "../../services/print.service";

@Component({
  selector: 'app-select-picto',
  templateUrl: './select-picto.component.html',
  styleUrls: ['./select-picto.component.css']
})
export class SelectPictoComponent implements OnInit {

  constructor(public editionService: EditionService,
              public printService: PrintService) { }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }
}
