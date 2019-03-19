import { ProtocolService } from './../services/protocol.services';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormProtocolModalComponent } from '../../components/form-protocol-modal/form-protocol-modal.component';
import { Storage } from '@ionic/storage';

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
      this.storage.get('protocol').then((value) => {
        const values = value;
        this.protocols2.push(values);
      });
  }

  async addProtocol() {
    const modal = await this.modalController.create({
      component: FormProtocolModalComponent,
      componentProps: {
        aParameter: true,
      }
    });
    modal.onWillDismiss().then(() => {
      this.storage.get('protocol').then((value) => {
        this.protocols2.push(value);
      });
    });
    return await modal.present();
  }
}
