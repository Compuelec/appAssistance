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

    const horaFormateada = hora.toString().padStart(2, '0');
    const minutosFormateados = minutos.toString().padStart(2, '0');

    const horaActual = `${horaFormateada}:${minutosFormateados}`;
    return horaActual;
  }


  diaActual() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const fecha = new Date();
    const dia = fecha.getDay();
    const diaActual = dias[dia];
    return diaActual;
  }

  validarRut(rut: string): boolean {
    // Eliminar puntos y guiones y convertir todo a mayúsculas
    rut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();

    if (!rut || rut.length < 3) {
      return false;
    }

    const cuerpoRut = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);

    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpoRut.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpoRut.charAt(i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const digitoEsperado = (11 - (suma % 11)).toString();

    if (digitoEsperado === "10") {
      return digitoVerificador === "K";
    } else if (digitoEsperado === "11") {
      return digitoVerificador === "0";
    } else {
      return digitoVerificador === digitoEsperado;
    }
  }

}
