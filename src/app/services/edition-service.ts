import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor() { }

  /**
   * current element color (#d3d3d3 = grey by default)
   */
  curentColor = '#d3d3d3';

  curentBorderColor = 'black';

  isSearch:boolean = false;
}
