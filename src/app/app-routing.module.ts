import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentEvaluationComponent } from './assessor-dashboard/components/assessment-evaluation/assessment-evaluation.component';
import { AssessorIndexComponent } from './assessor-dashboard/components/assessor-index/assessor-index.component';
import { CreateAssessmentComponent } from './assessor-dashboard/components/create-assessment/create-assessment.component';
import { EvalutaionDashboardComponent } from './assessor-dashboard/components/evalutaion-dashboard/evalutaion-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthorizationGuard } from './shared/guard/authorization.guard';
import { AnalyticsComponent } from './student-dashboard/components/analytics/analytics.component';
import { StudentIndexComponent } from './student-dashboard/components/student-index/student-index.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'signup', component: RegisterComponent
  },
  { path: 'assessor', redirectTo:'assessor/assessor-dashboard'
  },
  { path: 'student', redirectTo:'student/student-dashboard'},

  { path: 'student/student-dashboard', component: StudentIndexComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'student'
    }
  },
  { path: 'student/analytics/:sid', component: AnalyticsComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'student'
    },
  },
  { path:'assessor/assessor-dashboard', component: AssessorIndexComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'assessor'
    }
  },
  { path:'assessor/assessment-evaluation/:topic/:assessment_id', component: AssessmentEvaluationComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'assessor'
    }
  },
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
