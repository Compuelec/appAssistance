import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/loginStudents/loginStudents.module').then( m => m.LoginStudentsPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  {
    path: 'recory-password',
    loadChildren: () => import('./recory-password/recory-password.module').then( m => m.RecoryPasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
