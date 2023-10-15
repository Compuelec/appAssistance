import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  token = localStorage.getItem('token');
  studentEmail: string = '';

  userProfile = {
    name: '',
    rut: '',
    email: '',
    username: '',
  };

  constructor(private modalController: ModalController, private userService: UserService) {}

  buscarUsuarioPorEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe(
      (data) => {
        this.userProfile = {
          name: data.name + ' ' + data.lastNameM + ' ' + data.lastNameF,
          rut: data.rut,
          email: data.email,
          username: data.username,
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: 'EditProfilePage',
      componentProps: {
        userProfile: this.userProfile,
      },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.userProfile = data.data;
      }
    });
  }

  ngOnInit() {

    if (this.token !== null) {
    const decoded: any = jwt_decode(this.token);
    this.studentEmail = decoded['email'];
    this.buscarUsuarioPorEmail(this.studentEmail);
  }
  }

}
