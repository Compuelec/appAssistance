import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string = "";
  password:string = "";

  constructor(private _loginServiceService: LoginServiceService, private router: Router) { }

  ngOnInit() {
    const loggedInWorkerString = localStorage.getItem('loggedInWorker');

    if (loggedInWorkerString !== null) {
      this.router.navigate(['/home']);
      return;
    }
  }

  login(emial:string, password:string) {
    const loggedInWorker = this._loginServiceService.login(emial, password);
    if (loggedInWorker) {
      localStorage.setItem('loggedInWorker', JSON.stringify(loggedInWorker));
      this.router.navigate(['/home'], { state: { loggedInWorker } });
    } else {
      console.log("Inicio de sesión fallido");
    }
  }

}