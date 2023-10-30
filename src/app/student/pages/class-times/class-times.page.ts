import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-class-times',
  templateUrl: './class-times.page.html',
  styleUrls: ['./class-times.page.scss'],
})
export class ClassTimesPage implements OnInit {
  cards: { [key: string]: boolean }  = {
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false,
    Sabado: false,
  };

  constructor(private _appSrvice: AppService) { }

  ngOnInit() {
    this.toggleCard(this._appSrvice.diaActual());
  }

  toggleCard(day: string) {
    console.log(day);
    if (this.cards.hasOwnProperty(day)) {
      this.cards[day] = !this.cards[day];
    } else {
      console.error(`El día '${day}' no es válido.`);
    }
  }

  

}
