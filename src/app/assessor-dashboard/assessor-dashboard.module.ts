import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessorDashboardRoutingModule } from './assessor-dashboard-routing.module';
import { AssessorIndexComponent } from './components/assessor-index/assessor-index.component';


@NgModule({
  declarations: [
    AssessorIndexComponent
  ],
  imports: [
    CommonModule,
    AssessorDashboardRoutingModule
  ],
  exports:[AssessorIndexComponent]
})
export class AssessorDashboardModule { }
