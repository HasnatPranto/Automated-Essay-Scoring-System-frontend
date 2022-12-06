import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  assessor = false;
  user!: any

  constructor(private authService:AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.setNavBar()
  }

  setNavBar(){
    this.authService.authState.subscribe((data:any)=>{
      if(data)
      {
        this.user = data;
        this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    })
  }

  logOut(){
    this.authService.logOut();
    //this.router.navigate([''])
    this.setNavBar();
  }
}
