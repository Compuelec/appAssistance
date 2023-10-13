import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/rol.enum';
import jwt_decode from 'jwt-decode';

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
  qr: [{ curse: string, room: string, teacherId: string, }] = [{ curse: '', room: '', teacherId: '' }];

  token = localStorage.getItem('token');

  claseActiva: boolean = false;

  cursos = [
    {
      id: 1,
      nombre: 'Aplicaciones Web',
      descripcion: 'Curso de aplicaciones web',
      imagen: 'https://www.semantic-systems.com/semantic-noticias/wp-content/uploads/2023/05/Bedigital-2023.jpg',
      mostrarContenido: false,
      room: 'Sala 25',
      professor: 'Marcos Vinicius',
      cantidadAlumnos: 10,
    },
    {
      id: 2,
      nombre: 'Aplicaciones Moviles',
      descricion: 'Curso de aplicaciones moviles',
      imagen: 'https://www.semantic-systems.com/semantic-noticias/wp-content/uploads/2023/05/WBN-F%C3%A1brica-Digitalizada-11.jpg',
      mostrarContenido: false,
      room: 'Sala 25',
      professor: 'Marcos Vinicius',
      cantidadAlumnos: 12,
    }
  ];

  constructor() { }

  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.idTeacher = decoded['id'];
      this.nombreTeacher = decoded['username'];
      this.role = decoded['role'];
    }
  }

  iniciarClase(curso: any) {
    if (curso.mostrarContenido) {
      curso.mostrarContenido = false;
      this.claseActiva = false;
    } else {
      curso.mostrarContenido = true;
      this.claseActiva = true;

      const qr = [
        {
          curse: curso.nombre,
          room: curso.room,
          teacherId: this.idTeacher,
        }
      ];

      this.QrCode = JSON.stringify(qr);
      this.cursos.forEach(c => {
        if (c !== curso) {
          c.mostrarContenido = false;
        }
      });
    }
  }
}
