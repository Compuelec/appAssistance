import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.router.navigate(['/home']);
      return;
    }
  }

login(email: string, password: string) {
  const credentials: LoginData = { email, password };
  
  this._authService.loginStudents(credentials).subscribe(
    (response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Almacena el token en el localStorage
        this.router.navigate(['/home']);
      } else {
        console.log("Inicio de sesión fallido");
      }
    },
    (error: any) => {
      console.error("Error al iniciar sesión: ", error);
    }
  );
}


}