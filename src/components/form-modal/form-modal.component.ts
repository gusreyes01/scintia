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
    actualProtocol;

    constructor(
        private cycleService: CycleService,
        private modalController: ModalController,
        private navParams: NavParams,
        private storage: Storage,
    ) {
        this.actualProtocol = this.navParams.get('protocol');
        this.myGroup = new FormGroup({
            name: new FormControl(),
            repeat: new FormControl()
        });

    }
    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
    }
    save(formValue) {
        this.cycleService.addCycle(this.actualProtocol, formValue);
        formValue.expanded = false;
        this.modalController.dismiss(null);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }

}
