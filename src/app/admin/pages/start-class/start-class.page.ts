import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/rol.enum';
import { AppService } from 'src/app/services/app.service';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationsService } from 'src/app/services/notifications.service';

import jwt_decode from 'jwt-decode';
import { CreateClassService } from 'src/app/services/createClass.service';

@Component({
  selector: 'app-start-class',
  templateUrl: './start-class.page.html',
  styleUrls: ['./start-class.page.scss'],
})
export class StartClassPage implements OnInit {
  EnumRole = Role;
  role: string = '';
  idTeacher: string = '';
  nombreTeacher: string = '';
  QrCode: string = '';
  qr: { classId: string, } = { classId: '' };

  token = localStorage.getItem('token');

  claseActiva: boolean = false;
  claseActivaId: string = '';

  cursos = [
    {
      id: '1',
      nombre: 'Aplicaciones Web',
      descripcion: 'Curso de aplicaciones web',
      imagen: 'https://www.semantic-systems.com/semantic-noticias/wp-content/uploads/2023/05/Bedigital-2023.jpg',
      mostrarContenido: false,
      room: 'Sala 25',
      professor: 'Marcos Vinicius',
      cantidadAlumnos: 10,
      horarioIcicial: '12:00',
      horarioFinal: '13:00',
      dias: ['Lunes','Martes', 'Miercoles', 'Viernes', 'Sabado', 'Domingo'],
    },
    {
      id: '2',
      nombre: 'Aplicaciones Moviles',
      descricion: 'Curso de aplicaciones moviles',
      imagen: 'https://www.semantic-systems.com/semantic-noticias/wp-content/uploads/2023/05/WBN-F%C3%A1brica-Digitalizada-11.jpg',
      mostrarContenido: false,
      room: 'Sala 25',
      professor: 'Marcos Vinicius',
      cantidadAlumnos: 12,
      horarioIcicial: '13:00',
      horarioFinal: '15:00',
      dias: ['Lunes','Martes', 'Jueves', 'Sabado', 'Domingo'],
    }
  ];

  constructor(private _appService: AppService, private _notificationsService: NotificationsService, private _createClassService: CreateClassService, private _alertService: AlertService) { }

  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.idTeacher = decoded['id'];
      this.nombreTeacher = decoded['username'];
      this.role = decoded['role'];
    }

    if(localStorage.getItem('classInCourse')) {
      const inCourse = localStorage.getItem('classInCourse') || '';
      const classInCourse = JSON.parse(inCourse);
      this.claseActivaId = classInCourse.idCourse;
      const idClass = classInCourse._id;
      const qr = 
            {
              classId: idClass,
            };
      this.QrCode = JSON.stringify(qr);
    }

    this._notificationsService.notificationsEnterRoom$.subscribe((data: any) => {
      console.log(data);
    });
  }

  async iniciarClase(curso: any) {

    if(!localStorage.getItem('classInCourse')) {
      let idClass: string = '';
      const enterClass = await this.createClass(this.idTeacher, curso.nombre, curso.room);
      enterClass.subscribe((data: any) => {
        idClass = data._id;

        const dataToClass = { _id: idClass, name: curso.nombre, room: curso.room, idCourse: curso.id };
        const dataAsString = JSON.stringify(dataToClass);
        localStorage.setItem('classInCourse', dataAsString);

        if (curso.mostrarContenido) {
          curso.mostrarContenido = false;
          this.claseActiva = false;
        } else {
          curso.mostrarContenido = true;
          this.claseActiva = true;

          const qr = 
            {
              classId: idClass,
            };

          this.QrCode = JSON.stringify(qr);
          this.cursos.forEach(c => {
            if (c !== curso) {
              c.mostrarContenido = false;
            }
          });
        }
      });
    } else {
      this._alertService.showErrorAlert('Ya tienes una clase activa');
    }
  }

  finalizarClase(curso: any) {}

  createClass(idTeacher: string, course: string, room: string) {
    const body = {
      idTeacher,
      course,
      room,
    };
    return this._createClassService.postCreateClass(body);
  }

  getDiaActual() {
    return this._appService.diaActual();
  }

  getFechaActual() {
    return this._appService.fechaActual();
  }

  getHoraActual() {
    return this._appService.horaActual();
  }

}
