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

  fechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaActual = `${dia}/${mes}/${anio}`;
    return fechaActual;
  }

  horaActual() {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const horaActual = `${hora}:${minutos}`;
    return horaActual;
  }

  diaActual() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const fecha = new Date();
    const dia = fecha.getDay();
    const diaActual = dias[dia];
    return diaActual;
  }

}
