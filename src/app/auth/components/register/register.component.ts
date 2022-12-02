import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder:FormBuilder,private authService:AuthenticationService, private toast: ToastrService) { }

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

    }
    else{
      this.toast.error('Provide Required Data First!')
      console.log(this.registerForm.value)
  }
      // this.authService.login(this.registerForm.value).subscribe((resp:any)=>{
      //   console.log(resp)
      // })
    // else
    //   this.toast.error('Provide Username & Password First!')
  }
}
