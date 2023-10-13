import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NavbarPageModule } from './modules/navbar/navbar.module';
import { FooterPageModule } from './modules/footer/footer.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPageModule } from './modules/pages/admin/admin.module';
import { HomePageStudentModule } from './modules/pages/homeStudent/homeStudent.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    HomePageStudentModule,
    AdminPageModule,
    AppRoutingModule,
    NavbarPageModule,
    FooterPageModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
