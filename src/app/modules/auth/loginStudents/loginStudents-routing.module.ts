import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginStudentsPage } from './loginStudents.page';

const routes: Routes = [
  {
    path: '',
    component: LoginStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginStudentsPageRoutingModule {}
