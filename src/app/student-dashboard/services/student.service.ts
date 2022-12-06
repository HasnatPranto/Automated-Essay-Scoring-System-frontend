import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { api } from 'src/app/shared/utility/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient,private toast: ToastrService) { }

  searchAssessment(assessment_id:string){
    return this.http.get(api.baseUrl+api.search_assessment+'?aid='+assessment_id).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        if(Error.status!=404)  this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  enlistedAssessments(student_id:string){
    return this.http.get(api.baseUrl+api.enlisted_assessments+'?sid='+student_id).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  enlistToAssessment(assessment_id:string, student_id:string){
    return this.http.get(api.baseUrl+api.enlist+'?aid='+assessment_id+'&sid='+student_id).pipe(tap(
      (resp:any)=>{
        return resp;
      },
      Error=>{
        this.toast.error('Something went wrong! Try again later!')
      }
    ))
  }

  submitAssessment(formData: any){
    return this.http.post(api.baseUrl+api.submit_assessment,formData).pipe(tap(
      (resp:any)=>{
        if(resp) return resp;
      },
      Error=> this.toast.error('Something went wrong! Try again later!')
    ))
  }

  analyticsData(sid:string){
    return this.http.get(api.baseUrl+api.analytics_data + '?sid='+sid).pipe(
      tap(
        (resp:any)=>{
          return resp;
        },
        Error=>{
          this.toast.error('Something went wrong! Try again later!')
        }
      )
    )
  }

}
