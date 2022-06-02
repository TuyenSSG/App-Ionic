import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWebPage } from './view-web.page';

const routes: Routes = [
  {
    path: '',
    component: ViewWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWebPageRoutingModule {}
