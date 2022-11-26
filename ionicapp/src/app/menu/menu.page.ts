import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  indexSelect: number = 1;

  pages = [
    {
      title: 'Inicio',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Camara',
      url: '/menu/camera',
      icon: 'camera'
    }
  ]


  constructor(public alertController: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  changeIndexSelected(i){
    this.indexSelect = i;
  }


  async logout(){
    console.log("Salió");
    // const alert = await this.alertController.create({
    //   header: 'Salir',
    //   message: '¿Deberitas te quieres salir?',
    //   buttons: [
    //     {
    //       text: 'No mejor no',
    //       handler: () => {
            
    //       }
    //     }, {
    //       text: 'Sii',
    //       handler: () => {
    //         localStorage.removeItem('ingresado');
    //         this.navCtrl.navigateRoot('login');
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }

}
