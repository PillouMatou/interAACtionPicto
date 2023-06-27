import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalExitComponent } from './eval_exit.component';

describe('EvalExitComponent', () => {
    let component: EvalExitComponent;
    let fixture: ComponentFixture<EvalExitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EvalExitComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EvalExitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});