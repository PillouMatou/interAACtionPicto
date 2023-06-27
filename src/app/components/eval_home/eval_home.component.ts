import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EditionService} from "../../services/edition-service";

@Component({
    selector: 'app-eval-home',
    templateUrl: './eval_home.component.html',
    styleUrls: ['./eval_home.component.css']
})
export class EvalHomeComponent implements OnInit {

    is_checked: boolean = false;

    constructor(private router: Router,
                private editionService: EditionService) { }

    ngOnInit(): void {
        if (!this.editionService.logged){
            this.editionService.accessPage = "evalPictoHome";
            this.router.navigate(['login']);
        }
    }

    goToPage(): void {
        if(this.is_checked) {
            this.router.navigate(['evalPicto']);
        }
    };

    toggleEditable(event: Event) {
        // @ts-ignore
        if (event.target.checked) {
            this.is_checked = true;
        }
    }

}
