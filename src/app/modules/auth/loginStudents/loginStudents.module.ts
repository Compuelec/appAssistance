import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginStudentsPageRoutingModule } from './loginStudents-routing.module';
import { LoginStudentsPage } from './loginStudents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginStudentsPageRoutingModule
  ],
  declarations: [LoginStudentsPage]
})
export class LoginStudentsPageModule {}
