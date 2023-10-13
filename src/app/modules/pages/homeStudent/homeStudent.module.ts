import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HomePageStudent } from './homeStudent.page';

import { HomePageStudentRoutingModule } from './homeStudent-routing.module';
import { HomePageModule } from './pages/home/home.module';
import { ClassTimesPageModule } from './pages/class-times/class-times.module';
import { EnterClassPageModule } from './pages/enter-class/enter-class.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageStudentRoutingModule,
    HomePageModule,
    ClassTimesPageModule,
    EnterClassPageModule,
    QRCodeModule,
  ],
  declarations: [HomePageStudent],
  exports: [HomePageStudent],
})
export class HomePageStudentModule {}
