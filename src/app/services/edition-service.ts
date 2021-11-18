import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor() { }

  /**
   * current element color (#d3d3d3 = grey by default)
   */
  isSearch:boolean = false;

  result:string[][] = [];

  wordsText: any;

  imageSelected:string[] = [];

  numberOfCols:number = 2;

  police:string = 'Arial';

  policeColor:string = '#d3d3d3';

  policeSize:number = 16;

  curentBorderColor:string = 'black';

  typeOfBorder:string = 'solid';

  borderSize:number = 5;

}
