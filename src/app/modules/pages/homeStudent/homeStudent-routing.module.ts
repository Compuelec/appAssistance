import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageStudent } from './homeStudent.page';
import { EnterClassPage } from './pages/enter-class/enter-class.page';
import { ClassTimesPage } from './pages/class-times/class-times.page';
import { HomePage } from '../homeStudent/pages/home/home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageStudent,
    children:[
      {
        path: 'class-times',
        component: ClassTimesPage,
      },
      {
        path: 'enter-class',
        component: EnterClassPage,
      },
      {
        path: 'inicio',
        component: HomePage
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageStudentRoutingModule {}
