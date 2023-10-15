import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { StudentRoutingModule } from './student-routing.module';
import { LoyautPagesComponent } from './templates/loyaut-pages/loyaut-pages.component';
import { NavbarPage } from './component/navbar/navbar.page';
import { FooterPage } from './component/footer/footer.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { EnterClassPage } from './pages/enter-class/enter-class.page';
import { ClassTimesPage } from './pages/class-times/class-times.page';


@NgModule({
  declarations: [
    LoyautPagesComponent,
    NavbarPage,
    FooterPage,
    HomePage,
    ProfilePage,
    EnterClassPage,
    ClassTimesPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QRCodeModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
