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

  constructor(private formBuilder:FormBuilder,private authService:AuthenticationService, private toast: ToastrService,private router:Router) {
    this.isLoggedIn();
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  isLoggedIn(){
    if(this.authService.getSessionInfo())
      this.router.navigate([this.authService.getSessionInfo().usertype],{replaceUrl:true})
  }

  onSubmit() {
    if(this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((resp:any)=>{
        console.log(resp)
        this.router.navigate([this.authService.getSessionInfo().usertype],{replaceUrl:true})
      })
    else
      this.toast.error('Provide Username & Password First!')
}

}
