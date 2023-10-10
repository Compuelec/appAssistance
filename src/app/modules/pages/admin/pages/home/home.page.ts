import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logged: string = '';
  email: string = '';
  role: string = '';

  token = localStorage.getItem('token');

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.logged = decoded['username'];
      this.email = decoded['email'];
      this.role = decoded['role'];
    } else {
      this.router.navigate(['/login']);
    }
  }

}
