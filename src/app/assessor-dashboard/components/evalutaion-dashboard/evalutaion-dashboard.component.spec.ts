import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutaionDashboardComponent } from './evalutaion-dashboard.component';

describe('EvalutaionDashboardComponent', () => {
  let component: EvalutaionDashboardComponent;
  let fixture: ComponentFixture<EvalutaionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalutaionDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalutaionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
