import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPageComponent } from '../admin/templates/layout-page/layout-page.component';
import { HomePage } from './pages/home/home.page';
import { StartClassPage } from './pages/start-class/start-class.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'start-class',
        component: StartClassPage
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
