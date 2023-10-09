import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterClassPageRoutingModule } from './enter-class-routing.module';

import { EnterClassPage } from './enter-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterClassPageRoutingModule
  ],
  declarations: [EnterClassPage]
})
export class EnterClassPageModule {}
