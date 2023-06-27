import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalHomeComponent } from './eval_home.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('EvalHomeComponent', () => {
    let component: EvalHomeComponent;
    let fixture: ComponentFixture<EvalHomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EvalHomeComponent ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EvalHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
