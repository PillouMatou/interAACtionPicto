import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaxWordsComponent } from './dialog-max-words.component';

describe('DialogMaxWordsComponent', () => {
  let component: DialogMaxWordsComponent;
  let fixture: ComponentFixture<DialogMaxWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaxWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaxWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
