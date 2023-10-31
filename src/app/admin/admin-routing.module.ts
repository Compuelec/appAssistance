import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPageComponent } from '../admin/templates/layout-page/layout-page.component';
import { HomePage } from './pages/home/home.page';
import { StartClassPage } from './pages/start-class/start-class.page';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomePage },
      { path: 'start-class', component: StartClassPage },
      { path: 'add-user', component: AddUserComponent},
      { path: 'add-teacher', component: AddUserComponent},
      { path: 'add-student', component: AddUserComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
