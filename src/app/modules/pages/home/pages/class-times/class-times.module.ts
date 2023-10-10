import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClassTimesPageRoutingModule } from './class-times-routing.module';

import { ClassTimesPage } from './class-times.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassTimesPageRoutingModule
  ],
  declarations: [ClassTimesPage]
})
export class ClassTimesPageModule {}
