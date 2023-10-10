import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-times',
  templateUrl: './class-times.page.html',
  styleUrls: ['./class-times.page.scss'],
})
export class ClassTimesPage implements OnInit {
  cards: { [key: string]: boolean }  = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
  };

  constructor() { }

  ngOnInit() {
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
