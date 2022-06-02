import { Component } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  CouponJgrab: any = [];
  hide:boolean = true;
  
  constructor(
    public sanitizer: DomSanitizer,
    public db:DbService ) 
    {
    this.checkdata();
  }
  public data ="";

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";

  public checkdata(){
    // if(this.data == ""){
    //   this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
    // }
    // else{
      // this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
      this.db.getCouponJgrab().subscribe((response) => {
        this.CouponJgrab = response;
      })
      // this.navCtrl.back();
    // }
  }
  // show:boolean = false;
  show: {[key: number]: boolean} = {};
  public ngIfCtrl(index: number){
    if(this.show[index] == true) {
      this.show[index] = false;
    }else{
      this.show[index] = true
    }
  }
  public openViewCode(url){
    this.db.openWithCordovaBrowser(url);
  }
  getList(event) {
      
    event.target.complete();
    this.checkdata();

}
}
