import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProtocolService } from '../../app/services/protocol.services';

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
        private protocolService: ProtocolService,
        private navParams: NavParams,
        private storage: Storage,
    ) {
        this.myGroup = new FormGroup({
            title: new FormControl(),
        });
    }

    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
    }

    save(formValue) {
        // this.storage.set('protocol', formValue);
        this.protocolService.addProtocol(formValue.title);
        this.modalController.dismiss(null);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }
}
