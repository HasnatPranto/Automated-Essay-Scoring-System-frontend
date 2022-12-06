import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { api } from 'src/app/shared/utility/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AssessorService {

  constructor( private http: HttpClient, private toast: ToastrService) {}

  createAssessment(assessmentForm:any){
    return this.http.post(api.baseUrl+api.create_assessment,assessmentForm).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        if(Error.status==409)  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  getRunningAssessments(assessor:string){

    return this.http.get(api.baseUrl+api.running_assessments+'?aid='+assessor).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        if(Error.status!=404)  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  getCompletedAssessments(assessor:string){
    return this.http.get(api.baseUrl+api.completed_assessments+'?aid='+assessor).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        if(Error.status!=404)  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  getEnlistedStudents(assessment_id:string){
    return this.http.get(api.baseUrl+api.enlisted_students+'?am_id='+assessment_id).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        if(Error.status!=404)  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  getSystemScore(data:any){
    return this.http.post(api.baseUrl+api.getSystemScore,{"essay":data}).pipe(tap(
      resp=> {return resp},
      Error=> this.toast.error('Something went wrong! Try again later!')
      ))
  }

  calculateFScore(m:any,s:any,w:any){
    return this.http.post(api.baseUrl+api.calculateFinalScore,{'mscore':m,'sscore':s,'weight':w}).
      pipe(tap(
        (resp:any) => {return resp[0]},
        Error=> this.toast.error('Something went wrong! Try again later!')
        ))
  }

  submitScore(form:any){
    return this.http.post(api.baseUrl+api.score_submission,form).
    pipe(tap(
      (resp:any) => {return resp},
      Error=> this.toast.error('Something went wrong! Try again later!')
      ))
  }
}
