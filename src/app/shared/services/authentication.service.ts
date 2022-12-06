import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { api } from '../utility/apiEndpoints';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(null);
  user!:any;

  constructor(private http:HttpClient, private toast:ToastrService, private router:Router, private location: Location) {
    this.user = this.getSessionInfo();
    if(this.user) this.authState.next(this.user)
  }

  login(loginForm:any){
    return this.http.post(api.baseUrl+api.signin, loginForm).pipe(
      tap((resp: any) => {
        if (resp.success) {
          this.toast.success('Logged In!')
          this.saveTOStorage(resp);
        } else {
          this.authState.next(null);
        }
      }, Error=>{
        if(Error.status==401) this.toast.error('Invalid Credentials!')
        else  this.toast.error('Something went wrong! Try again later!')
      }
      )
    );
  }

  signup(registerForm:any){
    return this.http.post(api.baseUrl+api.signup,registerForm).pipe(tap(
      (resp:any)=>{
        if(resp.success){
         this.saveTOStorage(resp);
         return resp;
        }
        else  this.toast.error('Something went wrong! Try again later!')
      },
      Error=>{
        if(Error.status==400) this.toast.error('Username already exists! Try a new one')
        else  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  saveTOStorage(resp: any) {
    console.log(resp)
    let value = JSON.stringify({
      username: resp.session_info.username,
      fullname: resp.session_info.fullname,
      jwt_token: resp.session_info.jwt_token,
      usertype: resp.session_info.type
    });
    localStorage.setItem('session_info',value);
    this.authState.next(JSON.parse(value))
  }

  getSessionInfo(){
    this.user = localStorage.getItem('session_info')
    if(this.user){
      return JSON.parse(this.user||'');
    }
    else return null;
  }

  logOut(){
    localStorage.removeItem('session_info');
    this.authState.next(null);
    //this.router.replaceUrl('/login')
    //this.router.navigate(['/logout',{ replaceUrl: true}])
    //this.location.replaceState('/login');
    setTimeout(()=>{
      this.router.navigate(["/login"], {replaceUrl:true});
    },100)
  }
}
