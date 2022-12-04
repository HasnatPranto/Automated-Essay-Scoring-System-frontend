import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AssessorService } from '../../services/assessor.service';

@Component({
  selector: 'app-evalutaion-dashboard',
  templateUrl: './evalutaion-dashboard.component.html',
  styleUrls: ['./evalutaion-dashboard.component.scss']
})
export class EvalutaionDashboardComponent implements OnInit {
  completedAssessments !:any;
  runningAssessments!:any;

  constructor(private assessorService: AssessorService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getRunningAssessments();
    this.getCompletedAssessments();
  }

  goToThisAssessment(){
    console.log('sahj')
  }

  getCompletedAssessments(){
    this.completedAssessments = [];

    this.assessorService.getCompletedAssessments(this.authService.getSessionInfo().username).subscribe(
      (resp:any)=>{ this.completedAssessments = resp;}
    );
  }
  getRunningAssessments(){
    this.runningAssessments = [];
    this.assessorService.getRunningAssessments(this.authService.getSessionInfo().username).subscribe(
      (resp:any)=>{ this.runningAssessments = resp;}
    );
  }
}
