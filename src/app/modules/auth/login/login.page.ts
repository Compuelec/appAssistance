import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import jwt_decode from 'jwt-decode';

import { AuthService } from '../../../services/apiLogin.service';
import { LoginData } from '../../../interfaces/login.interface';
import { Role } from 'src/app/enums/rol.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  password:string = "";
  messageError:string = "";
  isMobile:boolean = false;

  token = localStorage.getItem('token');
  role: string = '';

  private subscription: Subscription | undefined;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.token) {
      const decoded: any = jwt_decode(this.token);
      this.role = decoded['role'];
      if (this.isMobileDevice()) {
        if (this.role === Role.STUDENT) {
          this.router.navigate(['/home']);
        } else if (this.role === Role.ADMIN || this.role === Role.TEACHER) {
          localStorage.removeItem('token');
          this.mostrarErrorAlert('Como administrador o profesor, debes acceder desde un ordenador.');
          return;
        }
      } else {
        if (this.role === Role.STUDENT) {
          localStorage.removeItem('token');
          this.mostrarErrorAlert('Como estudiante, debes acceder desde un dispositivo móvil.');
          return;
        } else if (this.role === Role.ADMIN || this.role === Role.TEACHER) {
          this.router.navigate(['/admin']);
        }
      }
    }
    this.isMobile = this.isMobileDevice();
    this._cdr.detectChanges();
  }
  async login(email: string, password: string) {
   if (!this.isValidEmail(email) || !this.isValidPassword(password)) {
     this.mostrarErrorAlert('Email no valido o contraseña no valida');
     return;
   }

  const credentials: LoginData = { email, password };

  const loading = await this.loadingCtrl.create({
    message: 'Conectando...',
  });

  await loading.present();

  this.subscription = this._authService.login(credentials).subscribe({
  next: (response: any) => {
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      const decoded: any = jwt_decode(response.token);
      this.role = decoded['role'];
      
      if (this.isMobileDevice()) {
        if (this.role === Role.STUDENT) {
          this.router.navigate(['/home']);
        }
      } else {
        if (this.role === Role.ADMIN || this.role === Role.TEACHER) {
          this.router.navigate(['/admin']);
        }
      }
      loading.dismiss();
    }
  },
    error: (error: any) => {
      if (error.status === 401) {
        this.mostrarErrorAlert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        loading.dismiss();
      }
      if (error.status === 500) {
        this.mostrarErrorAlert('Error en el servidor. Por favor, inténtalo de nuevo.');
        loading.dismiss();
      }
    },
    complete: () => {
      loading.dismiss();
    }
  });
}

  isMobileDevice() {
    return this.platform.is('mobile');
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async mostrarErrorAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de Credenciales',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }


}