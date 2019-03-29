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
    specialParameter: number;
    protocol: any;
    title;

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
        this.specialParameter = this.navParams.get('specialParameter');
        this.protocol = this.navParams.get('protocol');
        if (this.protocol) {
            this.title = this.protocol.title;
        }
    }

    save(formValue) {
        // this.storage.set('protocol', formValue);
        if (this.specialParameter === 1) {
            this.protocolService.addProtocol(formValue.title).then(data => {
                this.modalController.dismiss({
                    protocols: data
                });
            });
        } else {
            this.protocolService.editProtocol(this.protocol, formValue);
        }
    }

    closeModal() {
        this.modalController.dismiss(null);
    }
}
