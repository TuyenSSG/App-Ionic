import { Component } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DbService  } from './services/db.service';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse, } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';



// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[ SQLite, DbService],
})
export class AppComponent {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // private storage: SQLiteObject;
  // public clickNotificationSub= "";
  constructor(
    private splashScreen: SplashScreen,
    private platform: Platform,
    private statusBar: StatusBar,
   //private fcm: FCM,
    private router: Router,
    private firebase: Firebase,
    private firebasex: FirebaseX,
    private httpClient: HttpClient,
    private db:DbService,
    private oneSignal: OneSignal
    // private localNotifications:LocalNotifications
    
    ) {
    // this.splashScreen.hide();
    this.initializeApp();
    // this.firebaseCordova.onMessageReceived().subscribe(data => console.log(`FCM message: ${data}`));
  }
  
  public initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //ONE SIGNAL 
      this.oneSignal.startInit('32fccb23-feb5-4663-87ab-c2ada6618795', '339359157770');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // var data1 = data.payload.title;
        // var data2 =data.payload.body;
        // console.log("vao day 1"+JSON.stringify(data.payload.body) );
        // console.log("vao day 1"+JSON.stringify(data.payload.title) );
        // console.log("vao day 1");
        // this.db.saveNotiLocal(data1,data2);
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        // var data1 = data.notification.payload.title;
        // var data2 =data.notification.payload.body;
        // console.log("vao day 1"+JSON.stringify(data.notification.payload.body) );
        // console.log("vao day 1"+JSON.stringify(data.notification.payload.title) );
        // console.log("vao day 1");
        // this.db.saveNotiLocal(data1,data2);
        // console.log("vao day 2");
        // do something when a notification is opened
      });

      this.oneSignal.endInit();


      // FIREBASE
      this.firebase.logEvent('notification', {page: "tab"})
      .then((res: any) => console.log("token3"+res))
      .catch((error: any) => console.error("token4"+error));

      // FIREBASE X Will SAVE DATA TO DATABASE WHEN CLICK NOTI
      this.firebasex.onMessageReceived().subscribe(data => {
        var obj=JSON.stringify(data);
        var notijgrab12 ={
          news_title:data.body,
          news_content:data.title,
          datetime:data.title,
        };
        // this.db.createQrNotiJgrab(notijgrab12);
        console.log("User token firebase body"+ data.landing_page);
        // this.router.navigate(['/tabs/tab3/']);
        var data1 =data.news_title;
        var data2 =data.news_content;
        var data3 =[data.news_title,data.news_content,"0"];
        // console.log("data2"+data2);

        //TEST API
        // this.httpClient.post('http://164.70.95.147:39395/api/create-noti',
        // JSON.stringify(notijgrab12), 
        // this.httpOptions)
        // .subscribe(data => {
        //   console.log(data['_body']);
        // }, error => {
        //   console.log(error);
        // });
        //END TEST API

        console.log("vao 3");
        // this.db.saveNotiLocal(data1,data2);
      });

      // FIREBASE 
      this.firebase.getToken()
      .then(token => console.log(`The token is ${token}`)) 
      // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token firebase', error));

      // FIREBASE 
      this.firebase.onNotificationOpen()
        .subscribe(data2 =>{
          if (data2.wasTapped) {
            console.log('Received in background firebase');
          } else {
            console.log('Received in foreground firebase');
          }
          // this.router.navigate(['/tabs/tab3/'])
          // console.log("token firebase notification2"+ JSON.stringify(data2));
          console.log("vao 2");
      });

      // FIREBASE 
      this.firebase.onTokenRefresh().subscribe(
        (token) => console.log(` token firebase ${token}`)
      );

     
      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');
      // get FCM 

      // FCM token
      // this.fcm.getToken().then(token => {
      //   console.log("token fcm"+token);
      // });

      // this.fcm.onMessageReceived()subscribe(data => {});

      // // FCM PUSH NOTIFACTION AND SAVE DATA TO DATABASE WHEN APP IS USING
    //   this.fcm.onNotification().subscribe(data => {
    //     var data1 =data.news_title;
    //     var data2 =data.news_content;
    //     var data3 =[data.news_title,data.news_content,"0"];
    //     // console.log("data2"+data2);
    //     console.log("vao 1");
        
    //     console.log("token1 fcm"+data);
    //     if (data.wasTapped) {
    //       console.log('Received in background fcm');
    //     } 
    //     else {
    //       console.log('Received in foreground fcm');
    //     }
    //     //TEST API
    //     var notijgrab12 ={
    //       news_title:data.body,
    //       news_content:data.title,
    //       datetime:data.title,
    //     };
    //     // this.httpClient.post('http://164.70.95.147:39395/api/create-noti',
    //     // JSON.stringify(notijgrab12), 
    //     // this.httpOptions)
    //     // .subscribe(data => {
    //     //   console.log(data['_body']);
    //     // }, error => {
    //     //   console.log(error);
    //     // });
    //     //END TEST API
    //     // this.db.saveNotiLocal(data1,data2);
    //   },
    //   function (msg) {
    //     console.log('onNotification callback successfully registered: ' + msg);
    //   }
    //   );
    //   // // FCM 

    //   // this.fcm.onTokenRefresh().subscribe(token => {
    //   //   backend.registerToken(token);
    //   // });

    //   // // FCM 
    //   this.fcm.hasPermission().then(hasPermission => {
    //     if (hasPermission) {
    //       console.log("Has permission!" +hasPermission);
    //     }
    //   })
    //   // // FCM 
    //   this.fcm.clearAllNotifications();


    });
  }
}
