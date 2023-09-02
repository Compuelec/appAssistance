import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoryPasswordPage } from './recory-password.page';

const routes: Routes = [
  {
    path: '',
    component: RecoryPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoryPasswordPageRoutingModule {}
