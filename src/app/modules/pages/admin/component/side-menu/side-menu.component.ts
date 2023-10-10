import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  userId: string = '';
  role: string = '';

  token = localStorage.getItem('token');

  constructor() {}

  ngOnInit() {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.userId = decoded['id'];
      this.role = decoded['role'];
    }
  }

}
