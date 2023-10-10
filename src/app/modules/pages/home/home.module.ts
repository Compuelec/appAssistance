import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HomePage } from './home.page';
import { EnterClassPage } from './pages/enter-class/enter-class.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QRCodeModule,
  ],
  declarations: [EnterClassPage, HomePage],
  exports: [HomePage],
})
export class HomePageModule {}
