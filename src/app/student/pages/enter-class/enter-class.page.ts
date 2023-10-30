import { Component, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import jwt_decode from 'jwt-decode';

import { ClassEntryService } from 'src/app/services/classEntry.service';
import { NotificationsService } from 'src/app/services/notifications.service';

declare var cordova: any;

@Component({
  selector: 'app-enter-class',
  templateUrl: './enter-class.page.html',
  styleUrls: ['./enter-class.page.scss'],
})
export class EnterClassPage {
  scannedResult: boolean = false;
  idStudent: string = '';
  classId: string = '';
  room: string = '';
  course: string = '';
  token = localStorage.getItem('token');
  private subscription: Subscription | undefined;

  constructor(
    private _classEntryService: ClassEntryService,
    private _notificationsService: NotificationsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private el: ElementRef,
  ) {}

  mostrarErrorAlert(mensaje: string) {
    Swal.fire({
      title: 'Mensaje de alerta',
      text: mensaje,
      icon: 'error',
      customClass: {
        container: 'custom-swal-container custom-swal-center',
      },
    });
  }

  async ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.idStudent = decoded['id'];
    }

    if (this.isMobileDevice()) {
      this.requestCameraPermission();
    }
  }

  isMobileDevice() {
    return navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) !== null;
  }

  async requestCameraPermission() {
    document.addEventListener('deviceready', () => {
      cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.CAMERA, function (status: { hasPermission: any; }) {
        if (status.hasPermission) {
          // El usuario concedió permiso para la cámara.
        } else {
          // El usuario rechazó el permiso para la cámara.
        }
      }, function () {
        // Error al solicitar el permiso.
      });
    });
  }

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if(status.granted) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      if(result?.hasContent) {

        const resultScan = JSON.parse(result.content);
        this.room = resultScan.room;
        this.course = resultScan.course;
        this.classId = resultScan.classId;

        this.scannedResult = true;

        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
      }
    } catch (error) {
      console.error(error);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  async enterClass() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando asistencia...',
    });

    await loading.present();

    const body = {
      studentId: this.idStudent,
      classId: this.classId,
      // classId: "_2d096b15-efa1-449c-a55c-94cd05e677b"
    };

    this.subscription = this._classEntryService.postClassEntry(body).subscribe({
      next: (response: any) => {
        loading.dismiss();
        this.router.navigate(['student/home']);
      },
      error: (error: any) => {
        if (error.error.message === 'The student has already been registered in this class') {
          this.mostrarErrorAlert('Ya se encuentra registrado en esta clase');
          loading.dismiss();
        }
      },
      complete: () => {
        this._notificationsService.sendNotificationsEnterRoom({
          room: this.room,
          idUser: this.idStudent,
          classId: this.classId,
          // classId: "_2d096b15-efa1-449c-a55c-94cd05e677b"
        });
        console.log('Completado');
      }
    });
  }
}
