import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Error404PageComponent } from './error404-page/error404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    Error404PageComponent,
  ]
})
export class SharedModule { }
