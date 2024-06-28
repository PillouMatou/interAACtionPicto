import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToPictoComponent } from './speech-to-picto.component';

describe('SpeechToPictoComponent', () => {
  let component: SpeechToPictoComponent;
  let fixture: ComponentFixture<SpeechToPictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechToPictoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToPictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
