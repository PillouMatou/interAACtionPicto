import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EditionService} from "../../services/edition-service";
import {SaveDataService} from "../../services/save-data.service";

declare var checkLogin:any;
declare var getLogin:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: string = "";
  password: string = "";

  getResponse: any = "";
  listLogin: string[][] = [];

  showError: boolean = false;
  errorMessage: String = "";

  constructor(private router: Router,
              private editionService: EditionService,
              private saveDataService: SaveDataService) { }

  ngOnInit(): void {
  }

  getAccount(event: any){
    this.account = event.target.value;
  }

  getPassword(event: any){
    this.password = event.target.value;
  }

  checkLoginPassword(){
    if (this.account == "" || this.password == ""){
      this.showError = true;
      this.errorMessage = "Nom de compte ou mot de passe vide !";
    }else {
      checkLogin();

      let requestInterval = setInterval(() => {
        if (this.getResponse == "") {
          this.getResponse = getLogin();
        }else {
          clearInterval(requestInterval);
          this.generateTabFromLogin();
        }
      },500);
    }
  }

  generateTabFromLogin(){
    let tmpValue: any = this.getResponse;
    let tmpTab: string[];

    tmpValue = tmpValue.replaceAll("[", "");
    tmpValue = tmpValue.replaceAll("]", "");
    tmpValue = tmpValue.replaceAll('"', "");
    tmpTab = tmpValue.split(",");

    for (let i=0; i<tmpTab.length; i+=2){
      this.listLogin.push([tmpTab[i], tmpTab[i+1]]);
    }

    this.goodLogin();
  }

  goodLogin(){
    let goNext: boolean = false;
    for (let i=0; i<this.listLogin.length; i++){
      if ((this.listLogin[i][0] == this.account) && (this.listLogin[i][1] == this.password)){
        goNext = true;
      }
    }
    this.next(goNext);
  }

  next(value: boolean){
    if (value){
      this.editionService.logged = true;
      this.saveDataService.userLogged = this.account;
      this.reset();
      this.router.navigate([this.editionService.accessPage]);
    }else {
      this.showError = true;
      this.errorMessage = "Nom de compte ou mot de passe invalide !";
    }
  }

  reset(){
    this.getResponse = "";
    this.listLogin = [];
  }
}
