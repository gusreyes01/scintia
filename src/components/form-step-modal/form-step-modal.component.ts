import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'form-step-modal',
    templateUrl: 'form-step-modal.component.html',
    styleUrls: ['form-step-modal.component.scss']
})
export class FormStepModalComponent {


    myParameter: boolean;
    myOtherParameter: Date;
    myGroup: FormGroup;

    constructor(private modalController: ModalController,
        private navParams: NavParams) {

        this.myGroup = new FormGroup({
            temperature: new FormControl(),
            time: new FormControl()
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
