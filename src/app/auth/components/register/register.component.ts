import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  userTypes = [{key:"Student", value: 'student'},{key:"Assessor", value: 'assessor'}];
  constructor(private formBuilder:FormBuilder,private authService:AuthenticationService, private toast: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['',[Validators.required]],
      username: ['',[Validators.required]],
      type:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass == confirmPass ? null : { notSame: true };
  }

  onSubmit(){
    if(this.registerForm.valid){
      if(this.checkPasswords(this.registerForm)){
        this.toast.error('Password & Confirm Password Must Be The Same!')
      }
      else{
        this.authService.signup(this.registerForm.value).subscribe((resp:any)=>{
          console.log(resp);
          if(resp.success){
            this.toast.info('Account Creation Successful! Redirecting Now..')
            setTimeout(()=>{
              this.router.navigate([this.authService.getSessionInfo().usertype],{replaceUrl:true})
            },1000)
          }
        })
      }
    }
    else{
      this.toast.error('Provide Required Data First!')
      console.log(this.registerForm.value)
    }
  }
}
