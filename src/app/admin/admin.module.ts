import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

import { AdminPageRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './templates/layout-page/layout-page.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { HomePage } from './pages/home/home.page';
import { StartClassPage } from './pages/start-class/start-class.page';
import { AddUserComponent } from './pages/add-user/add-user.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    NavbarComponent,
    SideMenuComponent,
    HomePage,
    StartClassPage,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QRCodeModule,
    AdminPageRoutingModule,
  ],
})
export class AdminPageModule {}
