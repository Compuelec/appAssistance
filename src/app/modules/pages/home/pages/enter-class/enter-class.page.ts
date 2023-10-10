import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-enter-class',
  templateUrl: './enter-class.page.html',
  styleUrls: ['./enter-class.page.scss'],
})
export class EnterClassPage implements OnDestroy {

  QrCode = 'https://www.google.com';
  permission = false;
  scannedResult: any;

  constructor() {}

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if(status.granted) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result?.hasContent) {
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(result.content);
      }
    } catch (error) {
      console.error(error);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy(): void {
    this.stopScan();
  }


}
