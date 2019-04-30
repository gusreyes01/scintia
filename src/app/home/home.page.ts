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
  protocols: any = [];

  constructor(
    private protocolService: ProtocolService,
    private modalController: ModalController,
    private storage: Storage,
    public navCtrl: NavController,
  ) {
    this.protocols = [];
  }

  ionViewWillEnter() {
    this.protocolService.getProtocols().then(data => {
      this.protocols = data;
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
    this.protocols = data['protocols'];
  }

  async editProtocol(protocol, i) {
    const modal = await this.modalController.create({
      component: FormProtocolModalComponent,
      componentProps: {
        aParameter: true,
        specialParameter: 2,
        protocol: protocol
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.protocols = data['protocols'];
  }

  deleteProtocol(protocol) {
    this.protocols = this.protocolService.deleteProtocol(protocol);
  }
}
