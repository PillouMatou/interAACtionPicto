import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioTextFileShareService {
  private lemmatisedTextSource = new BehaviorSubject<string[]>([]);
  lemmatisedText$ = this.lemmatisedTextSource.asObservable();

  setLemmatisedText(text: string[]) {
    this.lemmatisedTextSource.next(text);
  }

}
