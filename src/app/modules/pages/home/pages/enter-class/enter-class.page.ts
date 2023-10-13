import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ClassEntryService } from 'src/app/services/classEntry.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-enter-class',
  templateUrl: './enter-class.page.html',
  styleUrls: ['./enter-class.page.scss'],
})
export class EnterClassPage implements OnDestroy {
  permission = false;
  scannedResult: any;
  idStudent: string = '';
  idTeacher: string = '';
  room: string = '';
  course: string = '';

  token = localStorage.getItem('token');

  constructor( private _classEntryService: ClassEntryService, private alertController: AlertController ) {}

  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.idStudent = decoded['id'];
    }
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
      console.log(result);
      if(result?.hasContent) {

        const resultScan = JSON.parse(result.content);
        this.room = resultScan.room;
        this.course = resultScan.course;
        this.idTeacher = resultScan.teacherId;

        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(result.content);
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

  ngOnDestroy(): void {
    this.stopScan();
  }

  enterClass() {

    const body = {
      studentId: this.idStudent,
      course: this.course,
      room: this.room,
      teacherId: this.idTeacher,

      // course: "Aplicaciones Web",
      // room: "Sala 25",
      // teacherId: "_c737e838-cf32-44d2-b4e4-59b7d292ca1"
    };

    this._classEntryService.postClassEntry(body).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        if (error.error.message === 'The student has already been registered in this class') {
          this.mostrarErrorAlert('Ya se encuentra registrado en esta clase');
        }
        console.log(error.error.message);
      },
      complete: () => {
        console.log('Completado');
      }
    });
  }

  async mostrarErrorAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error..',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
