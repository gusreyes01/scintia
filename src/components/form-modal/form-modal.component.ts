import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CycleService } from '../../app/services/cycle.services';
import { ProtocolService } from '../../app/services/protocol.services';

@Component({
    selector: 'form-modal',
    templateUrl: 'form-modal.component.html',
    styleUrls: ['form-modal.component.scss']
})
export class FormModalComponent {

    myParameter: boolean;
    myOtherParameter: Date;
    myGroup: FormGroup;
    specialParameter: number;
    actualProtocol;
    cycle: any;
    name;
    id;
    repeat;
    protocol: any;
    steps: [];

    constructor(
        private cycleService: CycleService,
        private protocolService: ProtocolService,
        private modalController: ModalController,
        private navParams: NavParams,
        private storage: Storage,
    ) {
        this.myGroup = new FormGroup({
            name: new FormControl(),
            repeat: new FormControl()
        });

    }
    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
        this.specialParameter = this.navParams.get('specialParameter');
        this.actualProtocol = this.navParams.get('protocol');
        this.cycle = this.navParams.get('cycle');
        if (this.cycle) {
            this.id = this.cycle.id;
            this.name = this.cycle.name;
            this.repeat = this.cycle.repeat;
            this.steps = this.cycle.steps;
        }
    }
    save(formValue) {


        if (this.specialParameter === 1) {

            const param_cycle = {
                id: this.actualProtocol.cycles.length + 1,
                name: this.name,
                repeat: this.repeat,
                steps: []
            };

            this.protocol = this.protocolService.addCycle(this.actualProtocol, param_cycle);
        } else {

            const param_cycle = {
                id: this.id,
                name: this.name,
                repeat: this.repeat,
                steps: this.steps
            };

            this.protocol = this.protocolService.updateCycle(this.actualProtocol, param_cycle);
        }
        this.modalController.dismiss(this.protocol);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }

}
