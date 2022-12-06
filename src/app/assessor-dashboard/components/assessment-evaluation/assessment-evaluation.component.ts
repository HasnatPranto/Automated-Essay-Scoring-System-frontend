import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessorService } from '../../services/assessor.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

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
  evaluationForm!:FormGroup;
  finalScoreSub = new BehaviorSubject(null);
  finalScore!:any;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private assessorService: AssessorService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.assessment_id = this.route.snapshot.params['assessment_id'];
    this.topic = this.route.snapshot.params['topic'];
    this.enlistedStudents();
    this.initForm();
  }

  isFinalScoreReady(){

    let mscore= Number(this.evaluationForm.get('manualScore')?.value);
    let sscore= Number(this.evaluationForm.get('systemScore')?.value);
    let weight = Number(this.evaluationForm.get('weight')?.value);

    if(mscore && sscore){
      this.finalScore = (Math.round((mscore*(1-weight))+(sscore*weight)));
      this.assessorService.calculateFScore(mscore,sscore,weight).subscribe(val=> this.finalScore = val);
      //console.log(this.finalScore)
    }
    else{
      this.finalScore = ''
    }
  }

  initForm(){
    this.finalScore = '';
    this.evaluationForm = this.formBuilder.group({
      eid: [this.assessmentInHand?.essay_id],
      manualScore:['',Validators.required],
      systemScore:['', Validators.required],
      weight:[.5],
      finalScore:[this.finalScore]
    })
  }

  onSubmit(){
    if(this.evaluationForm.valid){
      this.assessorService.submitScore(this.evaluationForm.value).subscribe((resp:any)=>{
        if(resp.success){
          setTimeout(()=>{window.location.reload()},1500);
          this.toast.success('Evaluation Completed!');
        }
        else this.toast.error('Something went wrong! Try again later!');
      })
    }
    else{
      this.toast.error('Provide Both Manual & Automated Score!')
    }
  }

  adjustWeight(event:any){
    console.log(event.target.value, this.evaluationForm.get('weight')?.value);
    this.isFinalScoreReady()
  }

  refresh(){
    this.assessmentInHand = null;
    this.initForm();
  }

  generateSystemScore(){

    if(this.assessmentInHand){
      this.spinner.show();
      this.assessorService.getSystemScore(this.assessmentInHand.content).subscribe((resp:any)=>{
        this.spinner.hide();
        if(resp.success){
          this.evaluationForm.patchValue({
            systemScore: resp.result
          })
          this.isFinalScoreReady();
        }
        else{
          this.spinner.hide();
          this.toast.error('Something Went Wrong! Try Again Later')
        }
      });
    }
    else this.toast.error('No Essay To Evaluate!')
  }

  doAssessment(item:any){
    this.assessmentInHand = item;
    this.initForm();
  }

  showStudents(event:any){
    this.isSubmitted = event.target.value == 'done'?true:false;
    this.assessmentInHand = null;
    this.initForm()
  }

  enlistedStudents(){
    this.spinner.show();
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
      this.spinner.hide()
      console.log(this.submissionDone,this.submissionPending)
    },
    Error=> this.spinner.hide()
    );

  }
}
