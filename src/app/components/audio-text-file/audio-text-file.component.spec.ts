import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTextFileComponent } from './audio-text-file.component';

describe('AudioTextFileComponent', () => {
  let component: AudioTextFileComponent;
  let fixture: ComponentFixture<AudioTextFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTextFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioTextFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
