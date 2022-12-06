import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { StudentIndexComponent } from './components/student-index/student-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    StudentIndexComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgxSpinnerModule
  ]
})
export class StudentDashboardModule { }
