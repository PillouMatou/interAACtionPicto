import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EditionService} from "../../services/edition-service";

@Component({
  selector: 'app-post-edition-home',
  templateUrl: './post-edition-home.component.html',
  styleUrls: ['./post-edition-home.component.css']
})
export class PostEditionHomeComponent implements OnInit {

  is_checked: boolean = false;

  constructor(private router: Router,
              private editionService: EditionService) { }

  ngOnInit(): void {
    if (!this.editionService.logged){
      this.editionService.accessPage = "postEditPictoHome";
      this.router.navigate(['login']);
    }
  }

  goToPage(): void {
    if(this.is_checked) {
      this.router.navigate(['postEditPicto']);
    }
  };

  toggleEditable(event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      this.is_checked = true;
    }
  }

}
