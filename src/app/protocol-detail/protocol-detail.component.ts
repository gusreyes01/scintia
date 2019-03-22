import { FormModalComponent } from './../../components/form-modal/form-modal.component';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FormStepModalComponent } from 'src/components/form-step-modal/form-step-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ProtocolService } from '../services/protocol.services';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'protocol-detail',
    templateUrl: 'protocol-detail.component.html',
    styleUrls: ['protocol-detail.component.scss'],
    providers: [ProtocolService],
})
export class ProtocolDetailComponent {


    cycles: any = [];
    itemExpandHeight = 200;
    protocol: any;
    protocol2: any;
    protocols: any = [];
    cycle: any;
    protocolId;

    constructor(
        private modalController: ModalController,
        private protocolService: ProtocolService,
        private route: ActivatedRoute,
        private storage: Storage,
        public alertController: AlertController,
        public navCtrl: NavController
    ) {
        this.storage.get('protocols').then(protocols => {
            this.getProtocols(protocols);
        });
    }

    ionViewWillEnter() {
        this.protocolId = this.route.snapshot.paramMap.get('id');
        // this.protocol = this.protocolService.getProtocol(protocolId);
    }

    getProtocols(protocols) {
        this.protocols = protocols;
        this.protocol = this.protocols.find(protocol => protocol.title === '' + this.protocolId);
    }

    async addCycle() {
        const modal = await this.modalController.create({
            component: FormModalComponent,
            componentProps: {
                aParameter: true,
                protocol: this.protocol
            }
        });
        modal.onWillDismiss().then((detail: OverlayEventDetail) => {
            /*if (detail !== null) {
                console.log('The result:', detail.data.value.repeat);
                this.protocol.addCycle({
                    id: 6, repeat: detail.data.value.repeat, expanded: false, steps: []
                });
            }*/
        });
        return await modal.present();
    }




    async addStep() {
        if (this.cycle) {
            const modal = await this.modalController.create({
                component: FormStepModalComponent,
                componentProps: {
                    aParameter: true,
                    protocol: this.protocol,
                    cycle: this.cycle
                }
            });
            /*modal.onWillDismiss().then((detail: OverlayEventDetail) => {
                if (detail !== null) {
                    this.cycle.addStep({ temperature: detail.data.value.temperature, time: detail.data.value.time });
                }
            });*/
            return await modal.present();
        }
    }

    delete(item) {
        const index = this.protocol.cycles.indexOf(item);
        if (index > -1) {
            this.protocol.cycles.splice(index, 1);
        }

    }


    expandCycle(item) {
        this.protocol.cycles.map((listItem) => {
            if (item === listItem) {
                this.cycle = item;
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;

        });

    }

}
