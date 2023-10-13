import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import jwt_decode from 'jwt-decode';

import { ClassEntryService } from 'src/app/services/classEntry.service';
@Component({
  selector: 'app-enter-class',
  templateUrl: './enter-class.page.html',
  styleUrls: ['./enter-class.page.scss'],
})
export class EnterClassPage implements OnInit, OnDestroy {
  permission = false;
  scannedResult: boolean = false;
  idStudent: string = '';

  idTeacher: string = '';
  room: string = '';
  course: string = '';

  // course = "Aplicaciones Web";
  // room = "Sala 25";

  token = localStorage.getItem('token');

  private subscription: Subscription | undefined;

  constructor( 
    private _classEntryService: ClassEntryService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private _cdr: ChangeDetectorRef,
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
  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.idStudent = decoded['id'];
    }
    
     this._cdr.detectChanges();
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
        this.idTeacher = resultScan.teacherId;

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

  ngOnDestroy(): void {
    this.stopScan();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async enterClass() {

    const loading = await this.loadingCtrl.create({
      message: 'Registrando asistencia...',
    });

    await loading.present();

    const body = {
      studentId: this.idStudent,
      course: this.course,
      room: this.room,
      teacherId: this.idTeacher,

      // course: "Aplicaciones Web",
      // room: "Sala 25",
      // teacherId: "_c737e838-cf32-44d2-b4e4-59b7d292ca1"
    };

    this.subscription = this._classEntryService.postClassEntry(body).subscribe({
      next: (response: any) => {
        loading.dismiss();
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.message === 'The student has already been registered in this class') {
          this.mostrarErrorAlert('Ya se encuentra registrado en esta clase');
          loading.dismiss();
        }
      },
      complete: () => {
        console.log('Completado');
      }
    });
  }

}
