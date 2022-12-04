import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorIndexComponent } from './components/assessor-index/assessor-index.component';
import { CreateAssessmentComponent } from './components/create-assessment/create-assessment.component';

const routes: Routes = [
  {path:'', component:AssessorIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorDashboardRoutingModule { }
