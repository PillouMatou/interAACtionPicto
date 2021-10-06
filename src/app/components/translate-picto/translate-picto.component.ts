import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
declare var onBodyLoad:any;

@Component({
  selector: 'app-translate-picto',
  templateUrl: './translate-picto.component.html',
  styleUrls: ['./translate-picto.component.css']
})
export class TranslatePictoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    onBodyLoad();
  }

  onSubmit(formText: NgForm) {
    console.log(formText.form.value.text);
  }
}
