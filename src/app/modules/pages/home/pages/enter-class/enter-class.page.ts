import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-enter-class',
  templateUrl: './enter-class.page.html',
  styleUrls: ['./enter-class.page.scss'],
})
export class EnterClassPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) {}


  ngOnInit() {
  }

  scanQRCode() {
    this.barcodeScanner.scan().then((result: { cancelled: any; text: any; }) => {
      if (!result.cancelled) {
        // Los datos del código QR escaneado se encuentran en result.text
        const qrData = result.text;
        // Puedes guardar qrData en una variable o realizar alguna acción con él
      }
    }).catch((error: any) => {
      console.error('Error al escanear el código QR', error);
    });
  }


}
