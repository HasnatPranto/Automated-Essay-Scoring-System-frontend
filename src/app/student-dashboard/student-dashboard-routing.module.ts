import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentIndexComponent } from './components/student-index/student-index.component';

const routes: Routes = [{path:'',component:StudentIndexComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentDashboardRoutingModule { }
