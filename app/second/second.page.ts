import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  price: any = '';
  landing_page: string = '';
  constructor(private route: ActivatedRoute,private db: DbService) 
  { 
    this.price = this.route.snapshot.params['price'];
    this.landing_page = this.route.snapshot.params['landing_page'];
    
    // var data ={
    //   news_title:this.landing_page,
    //   news_content:this.price,
    //   datetime:"0"
    // };
    // this.db.saveNoti(data);
    console.log("price"+ this.price);
  }
  
  
  ngOnInit() {
  }

}
