import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingPageModule)
      },
      {
        path: 'setting/information',
        loadChildren: () => import('../information/information.module').then(m => m.InformationPageModule)
      },
      {
        path: 'setting/historyqr',
        loadChildren: () => import('../historyqr/historyqr.module').then(m => m.HistoryqrPageModule)
      },
      {
        path: 'tab1/view-web',
        loadChildren: () => import('../view-web/view-web.module').then(m => m.ViewWebPageModule)
      },
      { 
        path: 'second/:price', 
        loadChildren: () => import('../second/second.module').then( m => m.SecondPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
