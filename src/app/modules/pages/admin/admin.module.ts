import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SideMenuModule } from '../admin/component/side-menu/side-menu.module';
import { HomePageModule } from './pages/home/home.module';
import { StartClassPageModule } from './pages/start-class/start-class.module';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideMenuModule,
    HomePageModule,
    StartClassPageModule,
    AdminPageRoutingModule,
  ],
  declarations: [AdminPage],
})
export class AdminPageModule {}
