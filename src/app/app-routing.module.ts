import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorIndexComponent } from './assessor-dashboard/components/assessor-index/assessor-index.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthorizationGuard } from './shared/guard/authorization.guard';
import { StudentIndexComponent } from './student-dashboard/components/student-index/student-index.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'assessor', component:AssessorIndexComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'assessor'
    }
  },
  { path: 'student', component: StudentIndexComponent,
    canActivate: [AuthorizationGuard],
    data: {
      role: 'student'
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
