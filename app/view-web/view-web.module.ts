import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWebPageRoutingModule } from './view-web-routing.module';

import { ViewWebPage } from './view-web.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWebPageRoutingModule
  ],
  declarations: [ViewWebPage]
})
export class ViewWebPageModule {}
