import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss'],
})
export class StudentIndexComponent implements OnInit {
  new_assessment!: any;
  pendingAssessments!: any;
  completedAssessments!: any;
  invalid = false;
  alreadyEnlisted = false;
  readyForSub = true;
  viewDetails = false;
  assessmentDetailsForm!:FormGroup;
  assessmentDetails!:any;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private studentService: StudentService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMyAssessments();
    this.initForm();
  }

  initForm(){
    this.assessmentDetailsForm = this.formBuilder.group({
      student_id: [this.authService.getSessionInfo().username],
      topic:['',],
      assessment_code:['',Validators.required],
      content: ['', Validators.required],
    })
  }

  onCodeSelect(event:any){

    if(this.readyForSub){
      let _assessment = this.pendingAssessments.filter((e:any)=>{ return e.assessment_code== event.target.value})[0];
      this.assessmentDetailsForm.patchValue({
        topic: _assessment.topic
      })
    }
    else if(this.viewDetails){
      let _assessment = this.completedAssessments.filter((e:any)=>{ return e.assessment_code== event.target.value})[0];
      this.assessmentDetailsForm.patchValue({
        topic: _assessment.topic,
        content: _assessment.content
      })
    }
  }

  viewAssessmentDetails(item:any){
    this.assessmentDetails = item;
  }

  selectAssessment(_assessment:any){
    if(this.readyForSub){
      this.assessmentDetailsForm.patchValue({
        topic: _assessment.topic,
        assessment_code: _assessment.assessment_code
      })
    }
    else if(this.viewDetails){
      this.assessmentDetailsForm.patchValue({
        topic: _assessment.topic,
        assessment_code: _assessment.assessment_code,
        content: _assessment.content
      })
    }
  }

  onSubmit(){
    if(this.assessmentDetailsForm.valid){
      this.studentService.submitAssessment(this.assessmentDetailsForm.value).subscribe((resp:any)=>{
        if(resp.success){
          this.toast.success('Essay Submitted Successfully');
          this.router.navigate(['']);
        }
      })
    }
    else{
      this.toast.error('Required Fields Must Be Filled!')
    }
  }

  searchByAssessmentID(assessment_id: string) {
    this.studentService.searchAssessment(assessment_id).subscribe((resp: any) => {
        this.new_assessment = resp;
        console.log(resp);
        if ((this.pendingAssessments.filter((e:any) => {return e.assessment_code == this.new_assessment?.assessment_code}).length > 0)||
        this.completedAssessments.filter((e:any) =>{return e.assessment_code == this.new_assessment?.assessment_code}).length > 0) {
          this.alreadyEnlisted = true;
        }
        this.invalid = resp == null ? true : false;
      });
  }

  enlist() {
    this.studentService
      .enlistToAssessment(this.new_assessment.assessment_code,this.authService.getSessionInfo().username)
      .subscribe((resp: any) => {
        if(resp.success){
          this.toast.success('You Have Been Enlisted To This Assessment!')
          this.router.navigate([''])
        }
        else this.toast.error('Something went wrong! Try again later!');
      });
  }

  getMyAssessments() {
    this.pendingAssessments = [];
    this.completedAssessments = [];

    this.studentService
      .enlistedAssessments(this.authService.getSessionInfo().username)
      .subscribe((resp: any) => {
        resp.forEach((item: any) => {
          item.late_submit = item.late_submit==0?'No':'Yes'; //*pending_assessments are yes here//
          if (item.pending){ this.pendingAssessments.push(item);}
          else this.completedAssessments.push(item);
        });
      });
  }

  toggleView(pending:boolean,completed:boolean){
    this.readyForSub = pending?true:false;
    this.viewDetails = completed?true:false;
    this.assessmentDetails = null;
  }
}
