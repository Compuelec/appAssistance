import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/homeStudent/homeStudent.module').then( m => m.HomePageStudentModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
{
    path: 'admin',
    redirectTo: 'admin/home',
    pathMatch: 'full', 
  },
  // {
  //   path: 'admin/home',
  //   loadChildren: () => import('./modules/pages/admin/admin.module').then( m => m.AdminPageModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'admin/start-class',
  //   loadChildren: () => import('./modules/pages/admin/pages/start-class/start-class.module').then( m => m.StartClassPageModule),
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
