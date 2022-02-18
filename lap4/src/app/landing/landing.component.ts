import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  productList = []
  p = ""
  constructor(private cookie: CookieService, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    if (this.cookie.get('token')) { // check cookies
      this.http
        .post(`${environment.API_URL}/product/list`,{}, { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
        .subscribe((res: any) => {
          console.log(res)
          this.productList = res.data
        })
    } else { // enter landing without login
      this.route.navigate(['login'])
      alert("pls login first")
    }

  }
  create() {
    this.route.navigate(['/create'])
  }

  toTop() {
    window.scroll(0, 0);
  }

  pathLogout() {
    this.cookie.remove('token')
    console.log(this.cookie);
    this.route.navigate(['/login'])

  }
}
