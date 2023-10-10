import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private platform: Platform) { }

  isMobileDevice() {
    return this.platform.is('mobile');
  }

}
