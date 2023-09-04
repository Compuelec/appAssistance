import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      loadChildren: () => import('./modules/auth/loginStudents/loginStudents.module').then( m => m.LoginStudentsPageModule),
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'class-times',
      loadChildren: () => import('./modules/pages/class-times/class-times.module').then( m => m.ClassTimesPageModule)
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
