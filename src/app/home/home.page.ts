import { ProtocolService } from './../services/protocol.services';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormProtocolModalComponent } from '../../components/form-protocol-modal/form-protocol-modal.component';
import { Storage } from '@ionic/storage';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ProtocolService],
})
export class HomePage {

  public title: string;

  cycles: any = [];
  itemExpandHeight = 200;
  protocols: { id: number; name: string; }[];
  protocols2: any;

  constructor(
    private protocolService: ProtocolService,
    private modalController: ModalController,
    private storage: Storage,
    public navCtrl: NavController,
    ) {
      this.protocols2 = [];
    }

  
  ngOnInit(){
    console.log("entro al onInit");
  }

  ionViewDidEnter(){
    console.log("entro al ionViewDidEnter");
  }

  ionViewWillEnter() {
    this.storage.get('protocols').then(data => {
      this.protocols2 = data;
      console.log("entro a viewWillEnter");
    });
  }

  async addProtocol() {
    const modal = await this.modalController.create({
      component: FormProtocolModalComponent,
      componentProps: {
        aParameter: true,
        specialParameter: 1,
        protocol: null
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log("retorno del modal", data);
    console.log(this.protocols2);
    //this.protocols2 = data;
    //console.log("segundo intento ", this.protocols2);
    this.title = data['title'];
    /*modal.onWillDismiss().then(() => {
      this.ionViewWillEnter();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
    return await modal.present();*/
  }

  async editProtocol(protocol) {
    const modal = await this.modalController.create({
      component: FormProtocolModalComponent,
      componentProps: {
        aParameter: true,
        specialParameter: 2,
        protocol: protocol
      }
    });
    modal.onWillDismiss().then(() => {
      this.ionViewWillEnter();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
    return await modal.present();
  }

  deleteProtocol(protocol, i) {
    this.protocolService.deleteProtocol(protocol, i);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
