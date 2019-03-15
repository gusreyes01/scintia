import { ProtocolService } from './../services/protocol.services';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

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

  constructor(public navCtrl: NavController, private modalController: ModalController, private protocolService: ProtocolService) {

  }

}
