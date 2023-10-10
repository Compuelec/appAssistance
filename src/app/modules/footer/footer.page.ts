import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  isMobile: boolean = false;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.isMobile = this.isMobileDevice();
  }

  isMobileDevice() {
    return this._appService.isMobileDevice();
  }

}
