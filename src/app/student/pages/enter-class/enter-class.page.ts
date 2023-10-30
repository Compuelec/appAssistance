import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import jwt_decode from 'jwt-decode';

import { ClassEntryService } from 'src/app/services/classEntry.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AlertService } from 'src/app/services/alert.service';

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

  successSound: HTMLAudioElement = new Audio();

  constructor(
    private _classEntryService: ClassEntryService,
    private _notificationsService: NotificationsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private _alertService: AlertService,
    private _cdr: ChangeDetectorRef
  ) {
    this.successSound = new Audio('assets/scan-success.mp3');
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

  OnDestroy() {
    this.stopScan();
    this._cdr.detectChanges();
  }

  isMobileDevice() {
    return navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) !== null;
  }

  async requestCameraPermission() {
    document.addEventListener('deviceready', () => {
      cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.CAMERA,  (status: { hasPermission: any; }) => {
        if (status.hasPermission) {
          // El usuario concedió permiso para la cámara.
        } else {
          this._alertService.showErrorAlert('No se ha concedido permiso para la cámara');
        }
      },  () => {
        this._alertService.showErrorAlert('Error al solicitar permiso para la cámara');
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

        this.successSound.play();

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
          this._alertService.showErrorAlert('Ya se encuentra registrado en esta clase');
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
