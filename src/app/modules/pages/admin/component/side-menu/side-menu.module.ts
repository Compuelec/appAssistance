import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SideMenuComponent } from './side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent],
})
export class SideMenuModule {}
