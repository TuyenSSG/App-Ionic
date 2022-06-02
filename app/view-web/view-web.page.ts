import { Component, OnInit } from '@angular/core'; 
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-view-web',
  templateUrl: './view-web.page.html',
  styleUrls: ['./view-web.page.scss']
})

export class ViewWebPage {
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
    clearcache : 'yes',
    clearsessioncache : 'yes',
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
  public url='https://www.j-grab.com/pages/about-j-grab';
  public target = "_self";


  constructor(private theInAppBrowser: InAppBrowser)
  {
    // this. openWithCordovaBrowser();
  }
  public openWithCordovaBrowser(){
   
    let browser = this.theInAppBrowser.create(this.url,this.target,this.options);
    browser.on('loadstop').subscribe(() => {

      // browser.executeScript({ code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.innerHTML = 'Need Help'; button.classList.add('need_help'); body.appendChild(button);  })();" });
      // browser.executeScript({ code: "(function() { var body = document.querySelector('body'); var button = document.createElement('div'); button.setAttribute('id','customBackbtn');button.innerHTML = 'QR'; button.classList.add('back_btn'); body.appendChild(button);  } )(   );" },);
      browser.executeScript({
        code: "document.getElementById('customBackbtn').onclick = function() { //Adding functionality here to somehow close browser}"
    })
      browser.insertCSS({ code: ".need_help {position: absolute;font-size: 22px;top: 0px;left: 50%;transform: translate(-50%);display: flex;justify-content: center;align-items: center ;height: 75px;color: white;background: #145a7b;width: 100%;} .back_btn {  text-decoration: underline;position: absolute; display:flex;align-items: center;height: 75px;font-size: 22px; top: 0px; left: 20px;color:#FFFFFF } #myvoya-sso-ui {padding-top: 75px;}" });
    });
  }
}