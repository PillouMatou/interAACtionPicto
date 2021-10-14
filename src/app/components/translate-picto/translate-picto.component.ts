import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LanguageService} from "../../services/language-service";
declare var monitorInput:any;
declare var getUrlPicto:any;
declare var reloadPictograms:any;

@Component({
  selector: 'app-translate-picto',
  templateUrl: './translate-picto.component.html',
  styleUrls: ['./translate-picto.component.css']
})
export class TranslatePictoComponent implements OnInit {

  result:any;
  cellsToScroll:number = 4;
  wordSearch:string = '';
  banksChecked:string[] = [];


  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
    this.result = [];
  }

  onSubmit(formText: NgForm) {
    this.resetResult();
    this.wordSearch = formText.form.value.text;
    monitorInput(formText.form.value.text, this.languageService.languageSearch);
    this.result = getUrlPicto();
    console.log('le resultat en TS',this.result);
  }

  chooseBank(arasaac: HTMLInputElement, mulberry: HTMLInputElement) {
    console.log('arasaac.value',arasaac.checked);
    console.log('mulberry.value',mulberry.checked);
    this.banksChecked = [];
    if(arasaac.checked){
      this.banksChecked.push(arasaac.value);
    }
    if(mulberry.checked){
      this.banksChecked.push(mulberry.value);
    }
    reloadPictograms(this.banksChecked);
  }

  resetResult(){
    this.result.length = 0;
  }
  Download( url: any, filename: any ) {
    let setFetching = false;
    let setError = false;

    const download = (url: RequestInfo, name: string | any[]) => {
      if (!url) {
        throw new Error("Resource URL not provided! You need to provide one");
      }
      setFetching =true;
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          setFetching =false;
          const blobURL = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobURL;

          if (name && name.length) if (typeof name === "string") {
            a.download = name;
          }
          document.body.appendChild(a);
          a.click();
        })
        .catch(() => setError = true);
    };

    download(url,filename);
  }
}
