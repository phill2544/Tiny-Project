import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ""
  password = ""
  wrongPass = false
  noUser = false
  error = false

  constructor(private cookie: CookieService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post(`${environment.API_URL}/auth/login`, { "userName": this.username, "passWord": this.password }).subscribe((res: any) => {
      console.log(res)
      console.log(res.data)
      if (res.data.loginStatus == 0) {
        this.cookie.put('token', res.data.token)
        this.route.navigate(['/landing'])
      }
      else if (res.data.loginStatus == 1) {
        console.log("wrongPassword")
        this.wrongPass = true
      } else if (res.data.loginStatus == 2 || res.data == null) {
        console.log("noUser")
        this.noUser = true
      }
    })
  }
  pathRegister() {
    this.route.navigate(['/register'])
  }


}
