import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  studentLogged: string = '';
  studentEmail: string = '';
  studentRole: string = '';

  constructor() {}

  ngOnInit() {

  const token = localStorage.getItem('token');

  if (token !== null) {
    const decoded: any = jwt_decode(token);
    console.log('Token decodificado:', decoded);
    this.studentLogged = decoded['username'];
    this.studentEmail = decoded['email'];
    this.studentRole = decoded['role'];
  } else {
    console.log("No hay token");
  }

}

}
