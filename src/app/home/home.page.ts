import { ProtocolService } from './../services/protocol.services';
import { Component } from '@angular/core';
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

  ionViewWillEnter() {
    this.storage.get('protocols').then(data => {
      this.protocols2 = data;
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
    modal.onWillDismiss().then(() => {
      this.ionViewWillEnter();
    });
    return await modal.present();
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
    });
    return await modal.present();
  }

  deleteProtocol(protocol) {
    console.log(protocol);
  }
}
