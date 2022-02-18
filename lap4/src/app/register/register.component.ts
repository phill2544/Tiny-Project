import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
username = ""
password = ""
textError = false
fillFull = false
existUsername = false
  constructor(private router : Router,private http : HttpClient) { }

  ngOnInit(): void {
  }

  register(){
       this.http.post(`${environment.API_URL}/user/register`,{"userName" : this.username , "passWord" : this.password})
       .subscribe((res:any)=> { 
        if(res.data == 0){//
        console.log("this password already exist")
        this.existUsername = true
      }
      else if(res.data == 1){//register complete 
        this.router.navigate(['/login'])
      }
     
    })
   
  }

  pathLogin(){
    this.router.navigate(['/login'])
  }

}
