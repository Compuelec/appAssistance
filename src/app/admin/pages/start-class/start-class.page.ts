import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';

import { Role } from 'src/app/enums/rol.enum';
import { StudentOnLineInterface } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CreateClassService } from 'src/app/services/createClass.service';
import { ClassEntryService } from 'src/app/services/classEntry.service';
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-class',
  templateUrl: './start-class.page.html',
  styleUrls: ['./start-class.page.scss'],
})
export class StartClassPage implements OnInit, OnDestroy {
  EnumRole = Role;
  role: string = '';
  idTeacher: string = '';
  nombreTeacher: string = '';
  QrCode: string = '';
  qr: { classId: string } = { classId: '' };

  token = localStorage.getItem('token');

  claseActiva: boolean = false;
  claseActivaId: string = '';
  studentsInClass: StudentOnLineInterface[] = [];

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
      horarioInicial: '12:00',
      horarioFinal: '14:00',
      dias: ['Lunes', 'Martes', 'Miércoles', 'Viernes', 'Sábado', 'Domingo'],
    },
    {
      id: '2',
      nombre: 'Aplicaciones Moviles',
      descripcion: 'Curso de aplicaciones móviles',
      imagen: 'https://www.qualitydevs.com/wp-content/uploads/2021/03/Desarrollo-apps-moviles-1288x724.jpg',
      mostrarContenido: false,
      room: 'Sala 26',
      professor: 'Marcos Vinicius',
      cantidadAlumnos: 12,
      horarioInicial: '01:00',
      horarioFinal: '01:33',
      dias: ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    {
      id: '3',
      nombre: 'Ingles',
      descripcion: 'Curso de ingles',
      imagen: 'https://previews.123rf.com/images/amisb/amisb1704/amisb170400142/76394959-concepto-de-dise%C3%B1o-de-word-banner-de-sitio-web-de-ingl%C3%A9s.jpg',
      mostrarContenido: false,
      room: 'Sala 29',
      professor: 'Miss. Mariana',
      cantidadAlumnos: 12,
      horarioInicial: '12:30',
      horarioFinal: '14:30',
      dias: ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    {
      id: '4',
      nombre: 'Calidad de Software',
      descripcion: 'Curso de calidad de software',
      imagen: 'https://findingtc.com/wp-content/uploads/2022/02/portada-blog_Mesa-de-trabajo-1-848x300.png',
      mostrarContenido: false,
      room: 'Sala 45',
      professor: 'Carlos Espinoza',
      cantidadAlumnos: 12,
      horarioInicial: '19:10',
      horarioFinal: '20:35',
      dias: ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    }
  ];

  private notificationsSubscription: Subscription | undefined;

  constructor(
    private _appService: AppService,
    private _notificationsService: NotificationsService,
    private _createClassService: CreateClassService,
    private _alertService: AlertService,
    private _classEntryService: ClassEntryService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeUserData();
    this.checkActiveClass();
    this.subscribeToNotifications();
  }

  ngOnDestroy() {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }

  initializeUserData() {
    if (this.token) {
      const decoded: any = jwt_decode(this.token);
      this.idTeacher = decoded['id'];
      this.nombreTeacher = decoded['username'];
      this.role = decoded['role'];
    }
  }

  checkActiveClass() {
    const classInCourse = localStorage.getItem('classInCourse');
    if (classInCourse) {
      const classData = JSON.parse(classInCourse);
      this.claseActivaId = classData.idCourse;
      this.QrCode = JSON.stringify({ 
        classId: classData._id,
        course: classData.name,
        room: classData.room,
      });
      this.studentInClass(classData._id);

      if (this.getHoraActual() >= classData.horarioFinal) {
        this._alertService.showErrorAlert(
          'Tienes una clase activa fuera de horario, finalízala para crear otra'
        );
      }
    }
  }

  subscribeToNotifications() {
    this.notificationsSubscription = this._notificationsService.notificationsEnterRoom$.subscribe(
      (data: any) => {
        if (data.classId) {
          this.studentInClass(data.classId);
        }
      }
    );
  }

  getHoraActual() {
    return this._appService.horaActual();
  }

  async iniciarClase(curso: any) {
    if (!localStorage.getItem('classInCourse')) {
      let idClass: string = '';
      const enterClass = await this.createClass(this.idTeacher, curso.nombre, curso.room).subscribe({
        next: (data) => {
          idClass = data._id;
          const dataToClass = {
            _id: idClass,
            name: curso.nombre,
            room: curso.room,
            idCourse: curso.id,
            horarioFinal: curso.horarioFinal,
            horarioInicial: curso.horarioInicial
          };
          const dataAsString = JSON.stringify(dataToClass);
          localStorage.setItem('classInCourse', dataAsString);
          if (curso.mostrarContenido) {
            curso.mostrarContenido = false;
            this.claseActiva = false;
          } else {
            curso.mostrarContenido = true;
            this.claseActiva = true;
            const qr = {
              classId: idClass,
              course: curso.nombre,
              room: curso.room,
            };
            this.claseActivaId = curso.id;
            this.QrCode = JSON.stringify(qr);
            this.cursos.forEach(c => {
              if (c !== curso) {
                c.mostrarContenido = false;
              }
            });
          }
        },
        error: (error) => {
          if ((error as any).error.message === 'The class already exists') {
            this._alertService.showErrorAlert('Esta clase ya fue creada el día de hoy y se dio por finalizada');
          }
        },
      });
    } else {
      this._alertService.showErrorAlert('Ya tienes una clase activa');
    }
    this._cdr.detectChanges();
  }

  async studentInClass(idClass: string) {
    const student = this._classEntryService.getStudents(idClass).subscribe(
      (data) => {
        this.studentsInClass = data;
        this._cdr.detectChanges();
      }
    );
  }

  finalizarClase(curso: any) {
    localStorage.removeItem('classInCourse');
    this.claseActiva = false;
    this.claseActivaId = '';
    this.QrCode = '';
    curso.mostrarContenido = false;
    this._alertService.showExitoAlert('Clase finalizada con éxito');
  }

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
}
