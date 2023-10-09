import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'class-times',
    loadChildren: () => import('./pages/class-times/class-times.module').then( m => m.ClassTimesPageModule)
  },
  {
    path: 'enter-class',
    loadChildren: () => import('./pages/enter-class/enter-class.module').then( m => m.EnterClassPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
