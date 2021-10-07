import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
declare var monitorInput:any;

@Component({
  selector: 'app-translate-picto',
  templateUrl: './translate-picto.component.html',
  styleUrls: ['./translate-picto.component.css']
})
export class TranslatePictoComponent implements OnInit {

  result:any;

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(formText: NgForm) {
    console.log('formText.form.value.text : ',formText.form.value.text);
    this.result = monitorInput(formText.form.value.text);
    console.log("resultat :", this.result);
  }
}
