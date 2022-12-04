import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessorDashboardRoutingModule } from './assessor-dashboard-routing.module';
import { AssessorIndexComponent } from './components/assessor-index/assessor-index.component';
import { EvalutaionDashboardComponent } from './components/evalutaion-dashboard/evalutaion-dashboard.component';
import { CreateAssessmentComponent } from './components/create-assessment/create-assessment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentEvaluationComponent } from './components/assessment-evaluation/assessment-evaluation.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AssessorIndexComponent,
    EvalutaionDashboardComponent,
    CreateAssessmentComponent,
    AssessmentEvaluationComponent
  ],
  imports: [
    CommonModule,
    AssessorDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports:[AssessorIndexComponent]
})
export class AssessorDashboardModule { }
