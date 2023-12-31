import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { AppService } from '../../../services/app.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged: string = '';
  email: string = '';
  role: string = '';

  token = localStorage.getItem('token');
  isMobile: boolean = false;

  constructor(private _cdr: ChangeDetectorRef, private router: Router, private _appService: AppService) {}

  ngOnInit() {
    this.isMobile = this.isMobileDevice();
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.logged = decoded['username'];
      this.email = decoded['email'];
      this.role = decoded['role'];
    }
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isMobileDevice() {
    return this._appService.isMobileDevice();
  }
}
