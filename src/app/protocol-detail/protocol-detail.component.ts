import { FormModalComponent } from './../../components/form-modal/form-modal.component';
import { Component } from '@angular/core';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FormStepModalComponent } from 'src/components/form-step-modal/form-step-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ProtocolService } from '../services/protocol.services';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { StepService } from '../services/step.services';
import { CycleService } from '../services/cycle.services';

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
    step: any;
    protocolId;
    check: boolean;

    constructor(
        private actionSheet: ActionSheet,
        private cycleService: CycleService,
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
        if (this.protocol.cycles) {
            this.protocol.cycles.map((listItem) => {
                listItem.expanded = false;
            });
        }
    }

    async addCycle() {
        const modal = await this.modalController.create({
            component: FormModalComponent,
            componentProps: {
                aParameter: true,
                specialParameter: 1,
                protocol: this.protocol,
                cycle: null
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
                    specialParameter: 1,
                    protocol: this.protocol,
                    cycle: this.cycle,
                    step: null
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

    async editCycle(cycle) {
        const modal = await this.modalController.create({
            component: FormModalComponent,
            componentProps: {
                aParameter: true,
                specialParameter: 2,
                protocol: this.protocol,
                cycle: cycle
            }
        });
        return await modal.present();
    }

    async deleteCycle(cycle) {
        this.cycleService.deleteCycle(this.protocol, cycle);
    }

    async editStep(step) {
        const modal = await this.modalController.create({
            component: FormStepModalComponent,
            componentProps: {
                aParameter: true,
                specialParameter: 2,
                protocol: this.protocol,
                cycle: this.cycle,
                step: step
            }
        });
        return await modal.present();
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

    expandStep(item) {
        this.cycle.steps.map((listItem) => {
            if (item === listItem) {
                this.step = item;
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;
        });
    }
}
