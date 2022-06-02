import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { DomSanitizer} from '@angular/platform-browser';
// import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-historyqr',
  templateUrl: './historyqr.page.html',
  styleUrls: ['./historyqr.page.scss'],
})
export class HistoryqrPage implements OnInit {
  QrCodeJgrab: any = [];
  QrCodeJgrabUser: any = [];
  mainForm: FormGroup;

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";
  // Datas123: any[] = [];
  // items: any[] =[];
  // datatesst = "https://facebook.com/";
  constructor(
      private location:Location,
      public db: DbService,
      public sanitizer : DomSanitizer,
    ) 
    {
      // this.db.getQRId();
      this.db.getQR();
      this.ionViewDidEnter();
      this.ionViewDidEnterUser();
    // this.db.getSong();
    // this.checkdata();
    }
  Back(){
    this.location.back();
  }
  public openBrowser(url){
    // console.log(url);
    this.db.openWithCordovaBrowser(url);
  }
  ngOnInit() {
     interval(3000).subscribe(
      (val) => { this.db.getSong()});
  }
  public loadPage(){
    //this.db.getQRId();
    this.db.getQR();
    this.ionViewDidEnter();
    this.ionViewDidEnterUser();
    
  }
  //test 
  // public checkdata(){
  //   if(this.db.Dataqr == null  ){
  //     this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
  //   }
  //   else{
  //     this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
  //     // this.navCtrl.back();
  //   }
  // }

  ionViewDidEnter() {
    this.db.getQrCodeJgrab().subscribe((response) => {
      this.QrCodeJgrab = response;
    })
  }
  ionViewDidEnterUser() {
    this.db.getQrCodeJgrabUser().subscribe((response) => {
      this.QrCodeJgrabUser = response;
    })
  }
  getList(event) {
      event.target.complete();
      this.db.getQR();
      this.ionViewDidEnter();
      this.ionViewDidEnterUser();
  }
}
