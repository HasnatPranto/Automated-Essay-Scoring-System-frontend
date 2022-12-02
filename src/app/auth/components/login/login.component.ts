import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;

  constructor(private formBuilder:FormBuilder,private authService:AuthenticationService, private toast: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if(this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((resp:any)=>{
        console.log(resp)
      })
    else
      this.toast.error('Provide Username & Password First!')
  //   this.alertService.info('Checking User Info');
  //   this.progressBar.startLoading();
  //   const loginObserver = {
  //     next: x => {
  //       this.progressBar.setSuccess();
  //       console.log('User logged in');
  //       this.alertService.success('Logged In');
  //       this.progressBar.completeLoading();
  //     },
  //     error: err => {
  //       this.progressBar.setError();
  //       console.log(err);
  //       this.alertService.danger('Unable to Login');
  //       this.progressBar.completeLoading();
  //     }
  //   };
  //   this.authService.login(f.value).subscribe(loginObserver);

  // }

}

}
