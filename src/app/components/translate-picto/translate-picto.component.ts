import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LanguageService} from "../../services/language-service";
import {MatDialog} from "@angular/material/dialog";
import {DialogMaxWordsComponent} from "../dialog-max-words/dialog-max-words.component";
import {EditionService} from "../../services/edition-service";
import {SaveDataService} from "../../services/save-data.service";
declare var monitorInput:any;
declare var getUrlPicto:any;
declare var getTokensForTS:any;
declare var getKeyPicto:any;
declare var clearUrlImageJS:any;

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
  banksChecked:string[] = ['arasaac', 'mulberry'];
  wordsText: any;
  keyPicto:string[][] = [];
  dataRegisterChecked: boolean = false;


  constructor(public languageService: LanguageService,
              public editionService: EditionService,
              public saveData: SaveDataService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.editionService.isSearch = false;
  }

  onSubmit(formText: NgForm) {
    this.resetRequest();
    this.wordSearch = formText.form.value.text;
    const numberOfWord = this.wordSearch.split(' ');
    this.editionService.wordsSearchTab = numberOfWord;
    if(numberOfWord.length > 50){
      this.openDialog();
      return;
    }
    monitorInput(formText.form.value.text, this.languageService.languageSearch);
    setTimeout(()=> {
      this.result = getUrlPicto();
      this.editionService.result = this.result;
      this.keyPicto = getKeyPicto();
      console.log('keys : ', this.keyPicto);
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
      this.wordsText = getTokensForTS();
      console.log('this.wordsText : ',this.wordsText);
      this.editionService.wordsText = this.wordsText;
      this.editionService.wordsTextSave = JSON.parse(JSON.stringify(this.wordsText));
      // this.addWordsIfNeeded();
      this.editionService.isSearch = true;
      if(this.dataRegisterChecked){
        this.saveData.dataRegisterChecked = true;
        this.saveData.addDataSearched(this.editionService.wordsText);
      }else{
        this.saveData.dataRegisterChecked = false;
      }
      numberOfWord.forEach(word => {
        this.editionService.imageSelected.push('null');
      });
      this.duplicateCase(numberOfWord);
      this.debug();
    },500);
  }

  chooseBank(arasaac: HTMLInputElement, mulberry: HTMLInputElement) {
    if(!arasaac.checked){
      this.banksChecked = this.banksChecked.filter((bank) => bank != arasaac.value);
    }
    if(!mulberry.checked){
      this.banksChecked = this.banksChecked.filter((bank) => bank != mulberry.value);
    }
    if(arasaac.checked){
      this.banksChecked.push(arasaac.value);
    }
    if(mulberry.checked){
      this.banksChecked.push(mulberry.value);
    }
  }

  resetRequest(){
    clearUrlImageJS();
    this.result = [];
    this.result.length = 0;
    this.editionService.result = [];
    this.editionService.imageSelected = [];
    this.displayResult = [];
    this.displayResult.length = 0;
    this.keyPicto.length = 0;
    this.wordSearch = '';
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
      // this.keyPicto[i] = this.deleteDoublonFromArray(this.keyPicto[i]);
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

  erase() {
    (<HTMLInputElement>document.getElementById("sentence-input")).value = "";
  }

  select(image: string,index: number) {
    this.editionService.imageSelected[index] = image;
  }

  dataRegister(data: HTMLInputElement) {
    this.dataRegisterChecked = data.checked;
  }

  private debug() {
    console.log('result : ', this.editionService.result);
    console.log('displayResult : ', this.displayResult);
  }

  duplicateCase(wordText: any){
    console.log('wordText : ',wordText);
    let alreadyAdd = false;
    wordText.forEach((word: string, index: number) => {
      for(let i = index + 1; i < wordText.length; i++){
        if(word == wordText[i] && !alreadyAdd){
          this.displayResult.splice(i,0,this.displayResult[index]);
          this.result.splice(i,0,this.result[index]);
          alreadyAdd = true;
        }
      }
      alreadyAdd = false;
    });
  }
}
