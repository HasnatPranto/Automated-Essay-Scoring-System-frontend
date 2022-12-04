import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessorService } from '../../services/assessor.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-assessment-evaluation',
  templateUrl: './assessment-evaluation.component.html',
  styleUrls: ['./assessment-evaluation.component.scss']
})
export class AssessmentEvaluationComponent implements OnInit {

  assessment_id = '';
  submissionPending!:any;
  submissionDone!:any;
  isSubmitted = true;
  assessmentInHand:any;
  topic='';

  constructor(private route:ActivatedRoute,
    private router:Router,
    private assessorService: AssessorService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.assessment_id = this.route.snapshot.params['assessment_id'];
    this.topic = this.route.snapshot.params['topic'];
    this.enlistedStudents();
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }

  doAssessment(item:any){
    this.assessmentInHand = item;
  }
  showStudents(event:any){
    this.isSubmitted = event.target.value == 'done'?true:false;
    this.assessmentInHand = null;
  }

  enlistedStudents(){
    this.submissionDone = [];
    this.submissionPending = [];
    console.log(this.assessment_id)
    this.assessorService.getEnlistedStudents(this.assessment_id).subscribe((resp: any) => {
        resp.forEach((item: any) => {
          item.content = item.content.replace(/(\r\n|\n|\r)/gm, "<br>");
          if(item.submitted){
            item.late_submit = item.late_submit==0?false:true;
            this.submissionDone.push(item)
          }
          else this.submissionPending.push(item);
        });
        console.log(this.submissionDone,this.submissionPending)
      });
  }
}
