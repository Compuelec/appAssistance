import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecoryPasswordPageRoutingModule } from './recory-password-routing.module';
import { RecoryPasswordPage } from './recory-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoryPasswordPageRoutingModule
  ],
  declarations: [RecoryPasswordPage]
})
export class RecoryPasswordPageModule {}
