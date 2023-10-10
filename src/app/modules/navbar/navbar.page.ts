import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  logged: string = '';
  email: string = '';
  role: string = '';

  token = localStorage.getItem('token');
  isMobile: boolean = false;

  constructor(private _cdr: ChangeDetectorRef, private router: Router, private _appService: AppService) { }

  ngOnInit() {

    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.logged = decoded['username'];
      this.email = decoded['email'];
      this.role = decoded['role'];
    }
    this.isMobile = this.isMobileDevice();
    this._cdr.detectChanges();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isMobileDevice() {
    return this._appService.isMobileDevice();
  }

}
