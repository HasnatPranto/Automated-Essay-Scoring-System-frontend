import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { api } from '../utility/apiEndpoints';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  constructor(private http:HttpClient, private toast:ToastrService) { }

  login(loginForm:any){
    return this.http.post(api.baseUrl+api.signin, loginForm).pipe(
      tap((resp: any) => {
        if (resp.success) {
          this.toast.success('Logged In!')
          this.saveTOStorage(resp);
        } else {
          this.authState.next(false);
        }
      }, Error=>{
        if(Error.status==401) this.toast.error('Invalid Credentials!')
        else  this.toast.error('Something went wrong! Try again later!')
      }
      )
    );
  }
  saveTOStorage(resp: any) {
    let value = JSON.stringify({
      username: resp.username,
      jwt_token: resp.jwt_token,
    });
    localStorage.setItem('session_info',value);
  }

  getSessionInfo(){
    if(localStorage.getItem('session_info'))
      return JSON.parse(localStorage.getItem('session_info')||'');
    else return null;
  }
}
