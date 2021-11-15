import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LanguageService} from "../../services/language-service";
import {MatDialog} from "@angular/material/dialog";
import {DialogMaxWordsComponent} from "../dialog-max-words/dialog-max-words.component";
declare var monitorInput:any;
declare var getUrlPicto:any;
declare var getTokensForTS:any;
declare var getKeyPicto:any;

@Component({
  selector: 'app-translate-picto',
  templateUrl: './translate-picto.component.html',
  styleUrls: ['./translate-picto.component.css']
})
export class TranslatePictoComponent implements OnInit {

  result:string[][] = [];
  displayResult:string[][] = [];
  resultTab:string[] = [];
  cellsToScroll:number = 4;
  wordSearch:string = '';
  banksChecked:string[] = [];
  wordsText: any;
  keyPicto:string[][] = [];


  constructor(public languageService: LanguageService,
              public dialog: MatDialog) { }

  ngOnInit(): void {}

  onSubmit(formText: NgForm) {
    this.resetRequest();
    this.wordSearch = formText.form.value.text;
    const numberOfWord = this.wordSearch.split(' ');
    if(numberOfWord.length > 5){
      this.openDialog();
      return;
    }
    monitorInput(formText.form.value.text, this.languageService.languageSearch);
    setTimeout(()=> {
      this.result = getUrlPicto();
      this.keyPicto = getKeyPicto();
      for (let i=0; i<this.result.length; i = i+1){
        this.result[i].forEach(value => {
          const tabValue = value.split('/');
          if(this.banksChecked.includes(tabValue[4])){
            this.resultTab.push(value);
          }
        });
        this.displayResult.push(this.resultTab);
        this.resultTab = [];
      }
    },50);
    setTimeout(()=>{
      this.wordsText = getTokensForTS();
      this.addWordsIfNeeded();
    },50);
  }

  chooseBank(arasaac: HTMLInputElement, mulberry: HTMLInputElement) {
    this.banksChecked = [];
    if(arasaac.checked){
      this.banksChecked.push(arasaac.value);
    }
    if(mulberry.checked){
      this.banksChecked.push(mulberry.value);
    }
  }

  resetRequest(){
    this.result.length = 0;
    this.displayResult.length = 0;
    this.keyPicto.length = 0;
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

  private addWordsIfNeeded() {
    for(let i = 0; i < this.keyPicto.length; i++){
      this.keyPicto[i].forEach(key => {
        if(key.includes('-')){
          const placement = key.split('-');
          let textKey = '';
          for(let j = 0; j < placement.length; j++){
            textKey = textKey + this.wordsText[placement[j]].text + ' ';
          }
          this.wordsText.splice(i,0,{text: textKey});
        }
      });
    }
  }
  openDialog(){
    this.dialog.open(DialogMaxWordsComponent, {
      height: '20%',
      width: '30%',
    });
  }
}
