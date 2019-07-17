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
import { ChartComponent } from '../chart/chart.component';
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
        private stepService: StepService,
        public alertController: AlertController,
        public navCtrl: NavController
    ) {
        this.storage.get('protocols').then(protocols => {
            this.getProtocols(protocols);
        });
    }

    ionViewWillEnter() {
        // this.protocol = this.protocolService.getProtocol(protocolId);
    }

    getProtocols(protocols) {
        this.protocolId = this.route.snapshot.paramMap.get('id');
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
        await modal.present();
        await modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.protocol = this.protocolService.updateProtocol(data['data']);
            }
        });

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
            await modal.present();
            await modal.onDidDismiss().then((data) => {
                if (data.data) {
                    this.protocol = this.protocolService.updateProtocol(data['data']);
                }
            });
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
        await modal.present();
        await modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.protocol = this.protocolService.updateProtocol(data['data']);
            }
        });
    }

    async deleteCycle(cycle, i) {
        this.protocol = this.protocolService.deleteCycle(this.protocol, cycle);
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
        await modal.present();
        await modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.protocol = this.protocolService.updateProtocol(data['data']);
            }
        });
    }

    async deleteStep(step, j) {
        this.protocol = this.protocolService.deleteStep(this.protocol, this.cycle, step);
    }


    expandCycle(cycle) {
        this.cycle = cycle;
    }


    expandStep(cycle, item) {
        cycle.steps.map((listItem) => {
            if (item === listItem) {
                this.cycle = cycle;
                this.step = item;
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            return listItem;
        });
    }

    run() {
        const { id, title, cycles } = this.protocol;
        let salida = '#';
        for (let i = 0; i < cycles.length; i++) {
            const cycle = cycles[i];
            const { repeat, steps } = cycle;
            salida += '*' + repeat + '%';
            for (let c = 0; c < steps.length; c++) {
                const step = steps[c];
                const { temperature, time } = step;
                salida += temperature + ',' + time;
                if (c + 1 < steps.length) {
                    salida += ',';
                }
            }
            salida += '%';
            salida += '*';
        }
        salida += '#';
        console.log(salida);
    }
}
