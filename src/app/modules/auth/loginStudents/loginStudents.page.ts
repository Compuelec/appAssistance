import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../../../services/apiLogin.service';
import { LoginData } from '../../../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './loginStudents.page.html',
  styleUrls: ['./loginStudents.page.scss'],
})
export class LoginStudentsPage implements OnInit {
  email:string = "";
  password:string = "";
  messageError:string = "";

 token = localStorage.getItem('token');

  private subscription: Subscription | undefined;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.token !== null) {
      this.router.navigate(['/home']);
    }
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

  this.subscription = this._authService.loginStudents(credentials).subscribe({
    next: (response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
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