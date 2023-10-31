import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './templates/layout-page/layout-page.component';
import { LoginPage } from './pages/login/login.page';



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
