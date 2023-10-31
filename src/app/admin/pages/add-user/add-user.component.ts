import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../interfaces/user.interface';
import { Role } from '../../../enums/rol.enum';
import { AppService } from '../../../services/app.service';
import { AlertService } from '../../../services/alert.service';
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

  tipoUser = 'Estudiante';

  selectedRole: Role = Role.TEACHER;

  role: string = '';

  token = localStorage.getItem('token');

  agregarUser = false;

  private subscription: Subscription | undefined;

  constructor(private userService: UserService, private _appService: AppService, private _alertService: AlertService) {
    this.formulario = new FormGroup({
      rut: new FormControl('', [Validators.required, this.validarRut.bind(this)]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameM: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameF: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(''),
    });

    if (this.role === Role.ADMIN) {
      this.formulario.addControl('adminOnlyField', new FormControl('', [Validators.required]));
    }

  }

  ngOnInit(): void {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.role = decoded['role'];
    }
    if (this.role === Role.ADMIN) {
      this.tipoUser = 'Usuario';
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
      }
    });
  }

  agregarUsuario() {
    this.agregarUser = true;
  }

  saveUser() {
    if (this.formulario.valid) {

      const password = '123456789';
      const datosUsuario = this.formulario.value;

      if (this.role !== Role.ADMIN) {
       const role = this.roleEnum.STUDENT;
       datosUsuario.role = role;
      }
      
      datosUsuario.password = password;

      console.log(datosUsuario);

      this.subscription = this.userService.postUser(datosUsuario).subscribe({
        next: (user: UserInterface) => {
          this.getUsers();
          this.agregarUser = false;
        },
        error: (error: any) => {
          if (error.error.message === 'Rut is already in use') {
            this._alertService.showErrorAlert('El RUT ya está en uso');
          }

          if (error.error.message === 'E-mail is already in use') {
            this._alertService.showErrorAlert('El correo ya está en uso');
          }
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        }
      });

    } else {
      this.formulario.markAllAsTouched();
      this._alertService.showErrorAlert('Debe completar todos los campos');
    }
  }

  deleteUser(user: UserInterface) {
    this._alertService.showDeleteUser(user.name, (res) => {
      if (res) {
        this.subscription = this.userService.deleteUser(user._id).subscribe({
          next: (user: UserInterface) => {
            this._alertService.showExitoAlert(`El usuario ${user.name} fue eliminado con éxito.`);
            this.getUsers();
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    });
  }

  validarRut(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (this._appService.validarRut(rut)) {
      return null;
    } else {
      return { rutInvalido: true };
    }
  }
}
