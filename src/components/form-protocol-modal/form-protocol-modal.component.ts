import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'form-protocol-modal',
    templateUrl: 'form-protocol-modal.component.html',
    styleUrls: ['form-protocol-modal.component.scss']
})
export class FormProtocolModalComponent {

    myParameter: boolean;
    myOtherParameter: Date;
    myGroup: FormGroup;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private storage: Storage,
    ) {
        this.myGroup = new FormGroup({
            title: new FormControl(),
            id: new FormControl()
        });
    }

    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
    }

    save(formValue) {
        formValue.id = Math.floor((Math.random() * 6) + 1);
        this.storage.set('protocol', formValue);
        this.modalController.dismiss(null);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }
}
