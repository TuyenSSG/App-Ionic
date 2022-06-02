import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Song } from './song';
import { Qrcode } from './qrcode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { InAppBrowser,InAppBrowserOptions,InAppBrowserEvent  } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { HttpHeaders, HttpResponse, } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// import { CookieService } from 'ngx-cookie-service';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

export interface Note {
  id?: string;
  title: string;
  text: string;
}
export class QRJgrab {
  product_name: string;
  product_image: string;
  url: string;
  date_time: string;
  user: string;
}
export class CounponJgrab {
  coupon_expiry: string;
  coupon_title: string;
  coupon_details: string;
  coupon_banner: string;
  coupon_code: string;
}
export class NotiJgrab {
  news_title: string;
  news_content: string;
  datetime: string;
}
@Injectable({
  providedIn: 'root'
})
export class DbService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public Datasong: any[] = [];
  public Dataqr: any[] = [];
  public Datanotilocal: any[] = [];
  public DatanotilocalOne: any[] = [];
  public Datanoti: any[] = [];
  public Datasong1: any[] = [];
  public name_model: any[] = [] ;
  public coockibrow: number[] = [] ;
  private requestHeaders: HttpHeaders;
  // id: number;
  // artist_name: string;
  // song_name: string;
  // // id: number;
  //   text: string;
  //   format: string;
  //   cancelled: string;
  //   datetime: string;
  private storage: SQLiteObject;
  
  public row_data: any = []; 
  
  public songsList = new BehaviorSubject([]);
  public QRList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly table_name: string = "songtable";
  readonly table_name2: string = "qrtable";
  readonly table_name3: string = "notifaction";
  readonly table_name4: string = "notification";
  readonly database_name: string = "showroom.db";
  readonly database_name1: string = "OneSignal.db";

  public options : InAppBrowserOptions = {
    closebuttoncolor: "#F34A4A",
    lefttoright: 'yes',
    hideurlbar: 'yes',
    toolbarcolor: '#E8E8E9',
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
    closebuttoncaption : 'X', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only 
    EnableViewPortScale: 'yes',
  };
  public url='https://www.j-grab.com/pages/about-j-grab';
  public target = "_self";
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private http: HttpClient,
    private http2: HTTP,
    private readonly sanitizer: DomSanitizer,
    private readonly theInAppBrowser: InAppBrowser,
    private firebasex: FirebaseX,
    private firestore: Firestore
    
    // private cookieService: CookieService 
  ) {
    this.requestHeaders = new HttpHeaders();
    this.requestHeaders.append('Content-Type', 'application/json');
    this.requestHeaders.append('Accept', 'application/json');

    this.platform.ready().then(() => {
      this.createDB();
      this.reateDB();
    });
  }
  headRequest(url: string):Observable<any> {
    return this.http.head(url, {observe: 'response'}); //is observe property necessary to make this http call? If not you can remove it.
  }
  // Create DB if not there
  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.storage = db;
        this.createTable();
        this.createTable2();
        this.createTable3();
        this.addSong();
        this.getSong();
        console.log('Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
   // Create table
  createTable() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name}  (id INTEGER PRIMARY KEY, artist_name varchar(255))
    `, [])
      .then(() => {
        console.log('Table Song!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable2() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name2}  (id INTEGER PRIMARY KEY, text varchar(255),format varchar(255),cancelled varchar(255),datetime varchar(255),user varchar(255))
    `, [])
      .then(() => {
        console.log('Table QR!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable3() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name3}  (id INTEGER PRIMARY KEY,texts varchar(255),body varchar(255),read varchar(255))
    `, [])
      .then(() => {
        console.log('Table Noti!');
        this.callNotiAgian();
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e));
      });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }

  


  ///// Notifaction


  // get noti onesigal
  private database: SQLiteObject;
  reateDB() {
    console.log('DB Create1');
    this.sqlite.create({
      name: this.database_name1,
      location: 'default'
    })
      .then((db1: SQLiteObject) => {
        this.database = db1;
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  GetNotiOne(){
    this.DatanotilocalOne=[];
     this.database.executeSql(`
      SELECT * FROM ${this.table_name4}
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist1= { 
              id: res.rows.item(i)._id, 
              title: res.rows.item(i).title, 
              message: res.rows.item(i).message, 
              opened: res.rows.item(i).opened,
              dismissed:res.rows.item(i).dismissed,
            };
              this.DatanotilocalOne.push(notilist1);
              console.log("Get Notilocal One");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  
  }
  CheckaddNotiOne(id){
    let data = [id];
    return this.database.executeSql(`UPDATE notification SET opened = 1 WHERE _id = ?`, data)
    .then(data => {
      console.log('update notifaction !');
    })
  }
  // this.storage.executeSql(`
  //     SELECT * FROM ${this.table_name4}
  //     `, [])
  //     .then((res) => {
  //       // this.row_data = [];
  //       if (res.rows.length > 0) {
  //         for (var i = 0; i < res.rows.length; i++) {
  //           var notilist= { 
  //             id: res.rows.item(i)._id, 
  //             title: res.rows.item(i).title, 
  //             message: res.rows.item(i).message, 
  //             opened: res.rows.item(i).opened,
  //             dismissed:res.rows.item(i).dismissed,
  //           };
  //             this.DatanotilocalOne.push(notilist);
  //             console.log("Get Notilocal One");
  //         }
  //       }
  //     })
  //     .catch(e => {
  //       //alert("error view qr" + JSON.stringify(e))
  //     });
  

  public NotiSql: any = [];
  saveNoti(data){
    // this.storage.executeSql('INSERT INTO notifaction (texts,body,read) VALUES (?,?,?) ', data)
    // .then(res => {
    //   console.log('add noti 1231231312!');
    // });
    return this.httpClient.post('http://164.70.95.147:39395/api/create-noti',JSON.stringify(data), this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
      }, error => {
      console.log(error);
    });
  }

  saveNotiLocal(data1,data2){
    // this.storage.executeSql('INSERT INTO notifaction (texts,body,read) VALUES (?,?,?) ', data)
    // .then(res => {
    //   console.log('add noti 1231231312!');
    // });
    var data= [data1,data2,0] ;
    console.log("123data0"+ JSON.stringify(data2) );
    console.log("123data1"+ data);
    console.log("123data2"+ data1);
    console.log("123data3"+ data2);
    this.storage.executeSql('INSERT INTO notifaction (texts,body,read) VALUES (?,?,?) ', data)
    .then(res => {
      console.log('add noti 1231231312!');
    });
  }
  getNotiLocal(){
    this.Datanotilocal=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name3}
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist= { 
              id: res.rows.item(i).id, 
              texts: res.rows.item(i).texts, 
              body: res.rows.item(i).body, 
              read: res.rows.item(i).read,
            };
              this.Datanotilocal.push(notilist);
              console.log("Get Notilocal");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  }
  callNotiAgian(){
    this.getNotiJgrab().subscribe((response) => {
      this.NotiSql = response;
      // var myObject = eval('(' + JSON.stringify(this.NotiSql) + ')');
      // var i;
      // console.log("vào đây");
      // for (i in myObject)
      // {
      //   // let data = [myObject[i]["_id"],myObject[i]["news_title"],myObject[i]["news_content"],myObject[i]["datetime"],"0"];
      //   let data = [myObject[i]["news_title"],myObject[i]["news_content"],"0"];
      //   this.storage.executeSql('INSERT INTO notifaction (texts,body,read) VALUES (?,?,?) ', data)
      //   .then(res => {
      //     console.log('add noti 1231231312!');
      //   });
      // }
    })
  }
  CheckaddNoti(id){
    let data = [id];
    return this.storage.executeSql(`UPDATE notifaction SET read = 1 WHERE id = ?`, data)
    .then(data => {
      console.log('update notifaction !');
    })
  }
  CheckPoin(){
    this.Datanoti=[];
    this.storage.executeSql(`
    SELECT * FROM ${this.table_name3} 
    `, []).then(res => { 
      //  if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var datanotis={ 
            ids: res.rows.item(i).ids,
            url: res.rows.item(i).url,
            image: res.rows.item(i).image,
            title: res.rows.item(i).title,
            datetime: res.rows.item(i).datetime,
            read: res.rows.item(i).read
           };
           this.Datanoti.push(datanotis);
           console.log("Get Noti");
        }
    });
  }
  ///end Notifactiion

  /// API 

  getQrCodeJgrab(): Observable<QRJgrab[]> {
    
    return this.httpClient.get<QRJgrab[]>('http://164.70.95.147:39395/api/get')
      .pipe(
        tap(QRJgrab23 => console.log('QR retrieved!')),
        catchError(this.handleError<QRJgrab[]>('Get QR', []))
      );
  }
  getQrCodeJgrabUser(): Observable<QRJgrab[]> {
    
      var user =this.name_model;
      return this.httpClient.get<QRJgrab[]>('http://164.70.95.147:39395/api/fetch-qr/'+user)
      .pipe(
        tap(_ => console.log('User fetched')),
        catchError(this.handleError<QRJgrab[]>(`Get user user`))
      );
   
    
  }
  createQrCodeJgrab(notijgrab12) {
    // console.log("dataa"+JSON.stringify(qrcodejgrab));
    return this.httpClient.post('http://164.70.95.147:39395/api/create-qr',JSON.stringify(notijgrab12), this.httpOptions)
      // .pipe(
      //   tap(QRJgrab23 => console.log('QR adddddddddd!')),
      //   catchError(this.handleError('Error occured'))
      // );
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }
  createQrNotiJgrab(qrcodejgrab) {
    // console.log("dataa"+JSON.stringify(qrcodejgrab));
    return this.httpClient.post('http://164.70.95.147:39395/api/create-noti',JSON.stringify(qrcodejgrab), this.httpOptions)
      // .pipe(
      //   tap(QRJgrab23 => console.log('QR adddddddddd!')),
      //   catchError(this.handleError('Error occured'))
      // );
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }
  getCouponJgrab(): Observable<CounponJgrab[]> {
    
    return this.httpClient.get<CounponJgrab[]>('http://164.70.95.147:39395/api/get-coupon')
      .pipe(
        tap(CouponJgrab23 => console.log('Coupon retrieved!')),
        catchError(this.handleError<CounponJgrab[]>('Get Coupon', []))
      );
  }
  getNotiJgrab(): Observable<NotiJgrab[]> {
    
    return this.httpClient.get<NotiJgrab[]>('http://164.70.95.147:39395/api/get-noti')
      .pipe(
        tap(NotiJgrab23 => console.log('Noti retrieved local!')),
        catchError(this.handleError<NotiJgrab[]>('Get Noti', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed1112: ${error.message}`);
      return of(result as T);
    };
  }  
  ///end  API 

  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }
  fetchQR(): Observable<Qrcode[]> {
    return this.QRList.asObservable();
  }
  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/showroom.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getSongs();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }
  // Get list
  getSongs(){
    this.Datasong=[];
    return this.storage.executeSql(`
    SELECT * FROM ${this.table_name} 
    `, []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var songs={ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name
           };
          //  items.push(songs);
           this.Datasong.push(songs);
        }
      }
    });
    
  }
  // Get single object
  
  getSong() {
    this.Datasong1=[];
    this.name_model=[];
    return this.storage.executeSql(`
    SELECT * FROM ${this.table_name} WHERE id = 1
    `, []).then(res => { 
       let items: Song[] = [];
      //  if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var songs={ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name
           };
          //  items.push(songs);
          this.Datasong1.push(songs);
          // console.log("song"+songs['artist_name']);
          this.name_model= songs['artist_name'];
          // console.log("song1"+this.name_model);
        }
    });
    //  this.name_model;
  }
  loginBro(){
    // this.getSong();
    // this.name_model=[];
    // var it= parseInt(JSON.stringify(this.name_model),10);
    // console.log("00000"+ it);
    // var it2=1;
    // if (it == 1 ){
    //   console.log("1111111"+JSON.stringify(this.name_model));
    // }
    // else {
    //   var myHtmlProperty: string = 'Plain Text Example &amp; <strong>Bold Text Example</strong>';
    //   this.sanitizer.bypassSecurityTrustHtml(myHtmlProperty);
    //   console.log("2222222"+typeof(it) + typeof(it2));
    //   console.log("2222221"+this.name_model);
    // }
    
  }
  getQRId(){
    this.Dataqr=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name2} WHERE user = ?
      `, [this.name_model])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist= { 
              id: res.rows.item(i).id, 
              text: res.rows.item(i).text, 
              format: res.rows.item(i).format, 
              cancelled: res.rows.item(i).cancelled, 
              datetime: res.rows.item(i).datetime
            };
              this.Dataqr.push(qrlist);
              console.log("Get QR ID");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  }
  getQR(){
    this.Dataqr=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name2} WHERE user = 1
      `, [])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist= { 
              id: res.rows.item(i).id, 
              text: res.rows.item(i).text, 
              format: res.rows.item(i).format, 
              cancelled: res.rows.item(i).cancelled, 
              datetime: res.rows.item(i).datetime
            };
              this.Dataqr.push(qrlist);
              console.log("Get QR");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
      
  }
  // Add
  addSong() {
    var artist_name = 1 ;
    let data = [artist_name];
    this.storage.executeSql(`
    INSERT INTO songtable (artist_name) VALUES (?) `, data)
    .then(res => {
      console.log('add song !');
      this.deleteSong();
      // this.getSongs();
    });
  }
  public qrcodejgrab ="";
  addQR(text, NameTitle,imgURL,datetime) {

    
    if (text == null || text == ""){
      console.log('aaaaaaaaaaaaaaaaaaaaaaa');
      return false;
    }
    else {
      var qrcodejgrab ={
        product_name:NameTitle,
        url:text,
        product_image:imgURL,
        date_time:datetime,
        user:this.name_model
      };
      // var qrcodejgrab =JSON.stringify(qrcodejgrab1);
      if (this.name_model.toString() != "1" ){
        this.createQrCodeJgrab(qrcodejgrab);
      }
      this.Dataqr=[];
      // console.log("aaa"+this.name_model);
      let data = [text, NameTitle,imgURL,datetime,this.name_model];
      // console.log("xxxx"+data);
      this.storage.executeSql('INSERT INTO qrtable (text,format,cancelled,datetime,user) VALUES (?, ?, ?, ?, ?)', data)
      .then(res => {
        console.log('add qr !');
        // this.getQR();
        // this.getQRId();
      });
     
    }
    
  }
 
  
  // Update
  updateSong(artist_name) {
    let data = [artist_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ? WHERE id = 1`, data)
    .then(data => {
      console.log('update song !');
    })
  }
  // Delete
  deleteSong() {
    return this.storage.executeSql('DELETE FROM songtable WHERE id > 1', [])
    .then(_ => {
      console.log("delete");
    });
  }
  saveCoockie(e:any){
    var string ="+"+e+"+";
    var a= string.slice(1,21);
    var b= string.slice(21,-1);
    return e;
  }
  public checkLogin(e){
    var string ="+"+e+"+";
    var a= string.slice(1,21);
    var b= string.slice(21,-1);
    return b;
    // if(e ==""){
    //   console.log("sai1");
    // }
    // if(b == "" || b ==null){
    //   console.log("sai2");
    // }
    // else {
    //   console.log("sai:"+b);
    // }
  }
  public openWithCordovaBrowser(url){
    let browser = this.theInAppBrowser.create(url,this.target,this.options);
    // document.getElementsByClassName('form__submit')[0].addEventListener('click', function(){ \
    //   console.log('click');\
    //   var a = document.getElementById('login-customer[email]').value;\
    //   console.log('12345' + a);\
    // });\
    
    browser.on('loadstop').subscribe((event) => {
        browser.executeScript({ 
          code:"\
          const form = document.getElementById('header_customer_login');\
          form.addEventListener('submit', function(event) { var a = document.getElementById('login-customer[email]').value; \
          console.log('111111111111');\
          var resutlObj =a; \
          var message = resutlObj;\
          var messageObj = {message: message};\
          var stringifiedMessageObj = JSON.stringify(messageObj);\
          window.webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);\
          });\
          const form2 = document.getElementById('customer_login');\
          form2.addEventListener('submit', function(event) { var b = document.getElementById('customer[email]').value; \
          console.log('222222222');\
          var resutlObj =b; \
          var message = resutlObj;\
          var messageObj = {message: message};\
          var stringifiedMessageObj = JSON.stringify(messageObj);\
          window.webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);\
          });\
          "
        });
        browser.on('message').subscribe((event)=>{
          const postObject:any = event;
          var artist_names= postObject.data.message;
          console.log('đây là:'+ postObject.data.message);
          this.updateSong(artist_names);
          this.getQRId();
          //Do whatever you want to with postObject response from inappbrowser        
        });
       // get cookie string from webview
        this.getSong();
        
        // check session
        (window as any).cordova.plugins.CookiesPlugin.getCookie(
          url,
          async (cookies) => {
            // console.log("taco:"+cookies);
            var c= Number(cookies.lastIndexOf('secure_customer_sig'));
            var d= c+ 52;
            var e=cookies.slice(c,d);
            var string ="+"+e+"+";
            var a= string.slice(1,22);
            var b= string.slice(21,-1);
            var artist_names= b;
            // this.coockibrow=artist_names;
            var artist_name = 1 ;
            if (a =="secure_customer_sig=;" || artist_names ==null){
              this.updateSong(artist_name);
              this.getQRId();
            }
            // else{
            //   this.updateSong(artist_names);
            //   this.getQRId();
            //   console.log("artist_names"+artist_names);
            // }
          });
          
      // browser.executeScript({ code: "(function() {\
      // var body = document.querySelector('body'); \
      // var button = document.createElement('div'); \
      // button.setAttribute('id','customBackbtn');\
      // button.innerHTML = 'QR';\
      // button.classList.add('back_btn');\
      // body.appendChild(button);\
      // } )(  );" });
      // browser.executeScript({
      //   code: "document.getElementById('customBackbtn').onclick =\
      //    function() {console.log('back123');}"
      // });
      browser.insertCSS({ code: ".need_help {position: absolute;font-size: 22px;top: 0px;left: 50%;transform: translate(-50%);display: flex;justify-content: center;align-items: center ;height: 75px;color: white;background: #145a7b;width: 100%;} .back_btn {  text-decoration: underline;position: absolute; display:flex;align-items: center;height: 75px;font-size: 22px; top: 0px; left: 20px;color:#FFFFFF } #myvoya-sso-ui {padding-top: 75px;}" });
      });
      // browser.on('loadstart').subscribe((event:InAppBrowserEvent)=>
      // {
      //      var closeUrl = url; 
      //      if(event.url == closeUrl)
      //     {       
      //       console.log("đã vào đây");
      //             browser.close();       //This will close InAppBrowser Automatically when closeUrl Started
      //      }
      // });
  }

  //đang test thử nghiệm load ngầm 
  public urlcou= "https://j-coupon.com/shops/j-grab";
  public getCounpon( ){
    return new Promise(resolve => {
      this.http.get(this.urlcou)
        .subscribe(data => {
           
            // use data to build table...
        },error=>{
            console.log(error);
        });
      });
  }
  

}

// 2022-03-24 16:16:33.751 21516-21516/io.ionic.starter I/chromium: [INFO:CONSOLE(340)] "https://www.j-grab.com/account/register localization=US; cart_currency=USD; _orig_referrer=; _landing_page=%2Fcollections%2Fopening-sale; _y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _shopify_y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _tracking_consent=%7B%22v%22%3A%222.0%22%2C%22reg%22%3A%22%22%2C%22lim%22%3A%5B%22GDPR%22%5D%2C%22con%22%3A%7B%22GDPR%22%3A%22%22%7D%7D; _shopify_tw=; _shopify_m=persistent; _ga=GA1.2.1536984735.1648004904; _gid=GA1.2.1557740712.1648004904; _gcl_au=1.1.1184808450.1648004904; _fbp=fb.1.1648004904599.1513577555; cart=87e7bea7a5520fd6b7927f04f45c2a46; apay-session-set=03aA%2B77FOT5QLK9T14vJVQWfYA%2BCxlqOsxdOuUzOZj0t1DhcyMpwQ%2BH4AwsHLCQ%3D; _s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_tm=; _shopify_sa_p=; shopify_pay_redirect=pending; _gat=1; __kla_id=eyIkcmVmZXJyZXIiOnsidHMiOjE2NDgwMDQ5MDYsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHBzOi8vd3d3LmotZ3JhYi5jb20vY29sbGVjdGlvbnMvb3BlbmluZy1zYWxlIn0sIiRsYXN0X3JlZmVycmVyIjp7InRzIjoxNjQ4MTEzMzg4LCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL3d3dy5qLWdyYWIuY29tL2FjY291bnQvbG9naW4ifX0=; _secure_session_id=f5c0f242f69dbb160d9862c4fb9be140; cart_ts=1648113389; cart_sig=ed45398afe9a9732833fee826453544a; secure_customer_sig=; cart_ver=gcp-us-east1%3A4; _shopify_sa_t=2022-03-24T09%3A16%3A30.372Z", source: http://localhost/default-src_app_services_db_service_ts.js (340)
// 2022-03-24 16:16:49.482 21516-21516/io.ionic.starter I/chromium: [INFO:CONSOLE(340)] "https://www.j-grab.com/account/register localization=US; cart_currency=USD; _orig_referrer=; _landing_page=%2Fcollections%2Fopening-sale; _y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _shopify_y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _tracking_consent=%7B%22v%22%3A%222.0%22%2C%22reg%22%3A%22%22%2C%22lim%22%3A%5B%22GDPR%22%5D%2C%22con%22%3A%7B%22GDPR%22%3A%22%22%7D%7D; _shopify_tw=; _shopify_m=persistent; _ga=GA1.2.1536984735.1648004904; _gid=GA1.2.1557740712.1648004904; _gcl_au=1.1.1184808450.1648004904; _fbp=fb.1.1648004904599.1513577555; cart=87e7bea7a5520fd6b7927f04f45c2a46; apay-session-set=03aA%2B77FOT5QLK9T14vJVQWfYA%2BCxlqOsxdOuUzOZj0t1DhcyMpwQ%2BH4AwsHLCQ%3D; _s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_tm=; _shopify_sa_p=; shopify_pay_redirect=pending; __kla_id=eyIkcmVmZXJyZXIiOnsidHMiOjE2NDgwMDQ5MDYsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHBzOi8vd3d3LmotZ3JhYi5jb20vY29sbGVjdGlvbnMvb3BlbmluZy1zYWxlIn0sIiRsYXN0X3JlZmVycmVyIjp7InRzIjoxNjQ4MTEzMzk1LCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL3d3dy5qLWdyYWIuY29tL2FjY291bnQvbG9naW4ifX0=; _secure_session_id=0541c67b11792862315ce734e37f6238; cart_ts=1648113407; cart_sig=575f1348c8f136dd0ad6374421f2d97f; secure_customer_sig=2bd6217fab4f747baf8dc56b305c5004; cart_ver=gcp-us-east1%3A5; _shopify_sa_t=2022-03-24T09%3A16%3A48.721Z; _gat=1", source: http://localhost/default-src_app_services_db_service_ts.js (340)
// 2022-03-24 16:20:06.602 21516-21516/io.ionic.starter I/chromium: [INFO:CONSOLE(340)] "https://www.j-grab.com/account/register localization=US; cart_currency=USD; _orig_referrer=; _landing_page=%2Fcollections%2Fopening-sale; _y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _shopify_y=560c5e69-4aea-4a7a-9fa2-bd154c9cd55d; _tracking_consent=%7B%22v%22%3A%222.0%22%2C%22reg%22%3A%22%22%2C%22lim%22%3A%5B%22GDPR%22%5D%2C%22con%22%3A%7B%22GDPR%22%3A%22%22%7D%7D; _shopify_tw=; _shopify_m=persistent; _ga=GA1.2.1536984735.1648004904; _gid=GA1.2.1557740712.1648004904; _gcl_au=1.1.1184808450.1648004904; _fbp=fb.1.1648004904599.1513577555; cart=87e7bea7a5520fd6b7927f04f45c2a46; apay-session-set=03aA%2B77FOT5QLK9T14vJVQWfYA%2BCxlqOsxdOuUzOZj0t1DhcyMpwQ%2BH4AwsHLCQ%3D; _s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_s=c8f094b3-5364-400c-baeb-284379bd5364; _shopify_tm=; _shopify_sa_p=; shopify_pay_redirect=pending; __kla_id=eyIkcmVmZXJyZXIiOnsidHMiOjE2NDgwMDQ5MDYsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHBzOi8vd3d3LmotZ3JhYi5jb20vY29sbGVjdGlvbnMvb3BlbmluZy1zYWxlIn0sIiRsYXN0X3JlZmVycmVyIjp7InRzIjoxNjQ4MTEzNDEwLCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL3d3dy5qLWdyYWIuY29tL2FjY291bnQvbG9naW4ifX0=; _secure_session_id=bcac6cfb4500afa36f805792ea08c151; cart_ts=1648113603; cart_sig=ed45398afe9a9732833fee826453544a; secure_customer_sig=; cart_ver=gcp-us-east1%3A6; _shopify_sa_t=2022-03-24T09%3A20%3A04.141Z; _gat=1", source: http://localhost/default-src_app_services_db_service_ts.js (340)
