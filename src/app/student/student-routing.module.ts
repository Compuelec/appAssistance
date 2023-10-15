import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyautPagesComponent } from './templates/loyaut-pages/loyaut-pages.component';
import { HomePage } from './pages/home/home.page';
import { EnterClassPage } from './pages/enter-class/enter-class.page';
import { ClassTimesPage } from './pages/class-times/class-times.page';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: LoyautPagesComponent,
    children: [
      { path: 'home', component: HomePage},
      { path: 'enter-class', component: EnterClassPage },
      { path: 'class-times', component: ClassTimesPage},
      { path: 'profile', component: ProfilePage},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
