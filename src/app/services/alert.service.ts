import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showErrorAlert(mensaje: string) {
    Swal.fire({
      title: 'Mensaje de alerta',
      text: mensaje,
      icon: 'error',
      customClass: {
        container: 'custom-swal-container custom-swal-center',
      },
    });
  }

  showDeleteUser(nameUser: string, callback: (result: boolean) => void) {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro de que deseas eliminar a "${nameUser}" como usuario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      callback(result.isConfirmed);
    });
  }

  showExitoAlert(nombre: string) {
    Swal.fire({
      title: 'Éxito',
      text: `El usuario ${nombre} fue eliminado con éxito.`,
      icon: 'success',
      customClass: {
        container: 'custom-swal-container custom-swal-center',
      },
    });
  }


}
