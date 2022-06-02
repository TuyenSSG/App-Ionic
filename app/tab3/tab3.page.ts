import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { DbService,Note  } from './../services/db.service';
import { NotifacationService  } from './../services/notifacation.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  NotiJgrab: any = [];
  data123: any = [];
  notes: Note[] = [];
  constructor( public sanitizer: DomSanitizer,
    public db: DbService,
    public database:NotifacationService,
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController
    ) {
      // this.db.getNotiLocal();
      this.db.GetNotiOne();
    //this.checkdata();
    // this.getNoti();
    // this.db.callNotiAgian();
    // this.db.CheckPoin();
    

    ///// 
    // this.db.getNotes().subscribe(res => {
    //   this.notes = res;
    //   this.cd.detectChanges();
    // });
  }
  public getNoti(){
    this.db.getNotiJgrab().subscribe((response) => {
      this.NotiJgrab = response;
    });
  }

  /////////
  // async addNote() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Add Note',
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'My cool note',
  //         type: 'text'
  //       },
  //       {
  //         name: 'text',
  //         placeholder: 'Learn Ionic',
  //         type: 'textarea'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }, {
  //         text: 'Add',
  //         handler: res => {
  //           this.db.addNote({ text: res.text, title: res.title });
  //         }
  //       }
  //     ]
  //   });
 
  //   await alert.present();
  // }
 
  // async openNote(note: Note) {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalPage,
  //     componentProps: { id: note.id },
  //     breakpoints: [0, 0.5, 0.8],
  //     initialBreakpoint: 0.8
  //   });
 
  //   await modal.present();
  // }


  /////////
  public data ="";

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";

  public checkdata(){
    // if(this.data == ""){
    //   this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
    // }
    // else{
    //   this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
    //   // this.navCtrl.back();
    // }
    this.db.getNotiJgrab().subscribe((response) => {
      this.NotiJgrab = response;
    })
  }
  public checkRead(id){
    // this.db.CheckaddNoti(id);
    this.db.CheckaddNotiOne(id);
  }
  public openBrowser1(url,ids){
    this.db.CheckaddNoti(ids);
    this.db.openWithCordovaBrowser(url);
  }
  public check(){
    
    // this.data123 = this.db.CheckPoin();
    // console.log("++++"+ JSON.stringify(this.data123))
    
  }
  getList(event) {
      
      event.target.complete();
      // this.db.callNotiAgian();
      // this.db.CheckPoin();
      this.db.getNotiLocal();
      this.db.GetNotiOne();
 
  }
  ngOnInit() {
    this.getList(null)
  }
}
