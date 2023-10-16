import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../interfaces/user.interface';
import { Role } from '../../../enums/rol.enum';
import { AppService } from '../../../services/app.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  formulario: FormGroup;

  users: UserInterface[] = [];

  roleEnum = Role;

  role: string = '';

  token = localStorage.getItem('token');

  agregarUser = false;

  private subscription: Subscription | undefined;

  constructor(private userService: UserService, private _appService: AppService) {
    this.formulario = new FormGroup({
      rut: new FormControl('', [Validators.required, this.validarRut.bind(this)]),
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastNameM: new FormControl('', [Validators.required]),
      lastNameF: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // Agrega más campos y validadores según sea necesario
    });
  }

  ngOnInit(): void {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.role = decoded['role'];
    }

    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUsers() {
    this.subscription = this.userService.getUsers().subscribe({
      next: ( users: UserInterface[] )=> {
        if(this.role === Role.TEACHER) {  
          users = users.filter((user: UserInterface) => user.role === Role.STUDENT);
        }
        this.users = users;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  agregarUsuario() {
    this.agregarUser = true;
  }

  saveUser() {
    if (this.formulario.valid) {
      // Los datos del formulario son válidos, puedes enviarlos
      const role = this.roleEnum.STUDENT;
      const password = '123456789';
      const datosUsuario = this.formulario.value;

      // Agregar el rol y la contraseña a los datos del usuario
      datosUsuario.role = role;
      datosUsuario.password = password;

      // Ahora puedes enviar los datos con el rol y la contraseña
      // console.log(datosUsuario);

      this.subscription = this.userService.postUser(datosUsuario).subscribe({
        next: (user: UserInterface) => {
          this.getUsers();
          this.agregarUser = false;
        },
        error: (error: any) => {
          if (error.error.message === 'Rut is already in use') {
            this.mostrarErrorAlert('El RUT ya está en uso');
          }

          if (error.error.message === 'E-mail is already in use') {
            this.mostrarErrorAlert('El correo ya está en uso');
          }
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        }
      });

    }
  }

  validarRut(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (this._appService.validarRut(rut)) {
      return null;
    } else {
      return { rutInvalido: true };
    }
  }

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

}
