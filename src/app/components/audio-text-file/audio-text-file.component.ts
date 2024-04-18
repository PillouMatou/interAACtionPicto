// bloc-component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-bloc',
  templateUrl: './audio-text-file.component.html',
  styleUrls: ['./audio-text-file.component.css']
})
export class AudioTextFileComponent {
  isActive: boolean = false;

  constructor() { }

  toggleBlock() {
    this.isActive = !this.isActive;
  }

}
