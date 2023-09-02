import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  token = localStorage.getItem('token');

  constructor(private router: Router, private _cdr: ChangeDetectorRef) {}

  ngOnInit() {

  if (this.token !== null) {
    const decoded: any = jwt_decode(this.token);
    this.studentLogged = decoded['username'];
    this.studentEmail = decoded['email'];
    this.studentRole = decoded['role'];
  } else {
      this.router.navigate(['/login']);
      return;
  }
  this._cdr.detectChanges();
}

}
