import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { StudentIndexComponent } from './components/student-index/student-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentIndexComponent
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StudentDashboardModule { }
