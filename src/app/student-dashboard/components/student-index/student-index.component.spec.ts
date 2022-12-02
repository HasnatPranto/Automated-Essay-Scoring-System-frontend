import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIndexComponent } from './student-index.component';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
