import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AssessorService } from '../../services/assessor.service';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss']
})
export class CreateAssessmentComponent implements OnInit {

  assessmentForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,private toast: ToastrService,
    private assessorService: AssessorService,private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.assessmentForm = this.formBuilder.group({
      assessor_id:[ this.authService.getSessionInfo().username],
      topic: ['', [Validators.required]],
      deadline: ['', Validators.required],
    });

  }

  onSubmit(){
    if(this.assessmentForm.valid){
      this.spinner.show();
      this.assessorService.createAssessment(this.assessmentForm.value).subscribe((resp:any)=>{
        if(resp){
          this.spinner.hide()
          this.toast.success('New Assessment Added! Assessment code: '.concat(resp.assessment_id));
          this.router.navigate(['']);
        }
        else {this.toast.error('Something went wrong! Try again later!');this.spinner.hide()}
      })
    }
    else
      this.toast.error('Invalid Assessment Info!')
  }
}
