import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CycleService } from '../../app/services/cycle.services';

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
    repeat;

    constructor(
        private cycleService: CycleService,
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
            this.name = this.cycle.name;
            this.repeat = this.cycle.repeat;
        }
    }
    save(formValue) {
        if (this.specialParameter === 1) {
            this.cycleService.addCycle(this.actualProtocol, formValue);
        } else {
            this.cycleService.editCycle(this.actualProtocol, this.cycle, formValue);
        }
        this.modalController.dismiss(null);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }

}
