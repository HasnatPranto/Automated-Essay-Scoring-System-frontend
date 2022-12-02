import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorIndexComponent } from './assessor-index.component';

describe('AssessorIndexComponent', () => {
  let component: AssessorIndexComponent;
  let fixture: ComponentFixture<AssessorIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
