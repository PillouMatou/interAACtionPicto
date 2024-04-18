// bloc-component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc-component.html',
  styleUrls: ['./bloc-component.css']
})
export class AudioTextFileComponent {
  isActive: boolean = false;

  constructor() { }

  toggleBlock() {
    this.isActive = !this.isActive;
  }
  
}
