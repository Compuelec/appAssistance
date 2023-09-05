import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  studentLogged: string = '';
  studentEmail: string = '';
  studentRole: string = '';

  token = localStorage.getItem('token');

  constructor(private _cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {

    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.studentLogged = decoded['username'];
      this.studentEmail = decoded['email'];
      this.studentRole = decoded['role'];
    }
    this._cdr.detectChanges();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
