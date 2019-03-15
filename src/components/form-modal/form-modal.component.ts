import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'form-modal',
    templateUrl: 'form-modal.component.html',
    styleUrls: ['form-modal.component.scss']
})
export class FormModalComponent {

    myParameter: boolean;
    myOtherParameter: Date;
    myGroup: FormGroup;

    constructor(private modalController: ModalController,
        private navParams: NavParams) {

        this.myGroup = new FormGroup({
            repeat: new FormControl(),
        });

    }
    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
    }
    save() {
        this.modalController.dismiss(this.myGroup);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }

}
