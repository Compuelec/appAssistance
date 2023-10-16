import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Role } from 'src/app/enums/rol.enum';

@Component({
  selector: 'admin-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  EnumRole = Role;
  userId: string = '';
  role: string = '';

  token = localStorage.getItem('token');

  constructor(private _cdr: ChangeDetectorRef) {
    if (this.token !== null) {
      const decoded: any = jwt_decode(this.token);
      this.userId = decoded['id'];
      this.role = decoded['role'];
      this._cdr.markForCheck();
    }
  }

  ngOnInit() {
  }

}
