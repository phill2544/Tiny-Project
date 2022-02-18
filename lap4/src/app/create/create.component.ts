import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  itemName: any = ""
  itemPrice: any = ""
  itemDetail: any = ""
  itemId: number | undefined
  data: any = ""
  editItem = false
  editButton = false
  createButton = false
  constructor(private cookie: CookieService, private route: Router, private http: HttpClient, private actRoute: ActivatedRoute) {
    console.log("WTF")
    this.actRoute.params.subscribe(data => { // receive p to data
      console.log(data);
      this.data = data
    })
  }

  ngOnInit(): void {
    if (this.data['productId'] != undefined) { //check that is there a productId
      this.editButton = true
      this.itemId = +this.data['productId'] // + is convert data from Str to Int
      this.http.post(`${environment.API_URL}/product/detail`,
        this.itemId,
        { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
        .subscribe((res: any) => {
          console.log(res)
          this.itemName = res.data.name
          this.itemPrice = res.data.price
          this.itemDetail = res.data.detail
        })
    } else {// change text button
      this.createButton = true
    }
  }

  addItem() {
    this.itemId = this.data['productId']
    this.http.post(`${environment.API_URL}/product/save`,
      {
        "detail": this.itemDetail,
        "name": this.itemName,
        "price": this.itemPrice,
        "productId": this.itemId
      },
      { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
      .subscribe((res: any) => {
        console.log(res)
        this.route.navigate(['/landing'])
      })

  }

  pathCacel() {
    console.log("pathCacel")
    this.route.navigate(['/landing'])
  }

}
