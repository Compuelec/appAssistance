import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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

  private subscription: Subscription | undefined;

  constructor(private _authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.router.navigate(['/home']);
      return;
    }
  }
  login(email: string, password: string) {
    if (!this.isValidEmail(email) || !this.isValidPassword(password)) {
        this.mostrarErrorAlert('Email no valido o contraseña no valida');
        return;
      }
    const credentials: LoginData = { email, password };

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
        }
      },
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