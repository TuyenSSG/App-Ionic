import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DbService } from './../services/db.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable,Subscription, interval  } from 'rxjs';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public url='https://www.j-grab.com/pages/about-j-grab';
  public target = "_self";

  public html=" <style>.login2{display:none;} <style>";
  public html2= "<style>.login1{display:none;} <style>";
  public newContent:any;


  public options : InAppBrowserOptions = {
    closebuttoncolor: "#ffffff",
    lefttoright: 'yes',
    hideurlbar: 'yes',
    toolbarcolor: '#145a7b',
    useWideViewPort: 'no',
    hidenavigationbuttons: 'yes',
    footer: 'no',
    message: "Hello",
    hidden : 'no', //Or  'yes'
    clearcache : 'no',
    clearsessioncache : 'no',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };
  constructor( 
    private theInAppBrowser:InAppBrowser,
    private db:DbService,
    private sanitizer:DomSanitizer
    ) {
    this.db.getSong();
    this.checklogin1();
    this.db.name_model;
    // this.db.getQRId();
   }

  ngOnInit() {
    interval(3000).subscribe(
      (val) => { this.checklogin1()});
  }
  // public openWithCordovaBrowser(url){
   
  //   let browser = this.theInAppBrowser.create(url,this.target,this.options);
  //   browser.on('loadstop').subscribe(() => {

  //     // browser.executeScript({ code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.innerHTML = 'Need Help'; button.classList.add('need_help'); body.appendChild(button);  })();" });
  //     // browser.executeScript({ code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.setAttribute('id','customBackbtn');button.innerHTML = 'QR'; button.classList.add('back_btn'); body.appendChild(button);  } )(   );" },);
  //     browser.executeScript({
  //       code: "document.getElementById('customBackbtn').onclick = function() { //Adding functionality here to somehow close browser}"
  //   })
  //     browser.insertCSS({ code: ".need_help {position: absolute;font-size: 22px;top: 0px;left: 50%;transform: translate(-50%);display: flex;justify-content: center;align-items: center ;height: 75px;color: white;background: #145a7b;width: 100%;} .back_btn {  text-decoration: underline;position: absolute; display:flex;align-items: center;height: 75px;font-size: 22px; top: 0px; left: 20px;color:#FFFFFF } #myvoya-sso-ui {padding-top: 75px;}" });
  //   });
  // }
  public openBrowser(url){
   
    this.db.openWithCordovaBrowser(url);
  }

  public checklogin1(){
    var a =this.db.name_model.toString();
    // console.log("đây là "+ typeof(this.db.name_model));
    // var a = "2";
    if(a == "1"){
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
    }
    else{
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
      // this.navCtrl.back();
    }
  }
}
