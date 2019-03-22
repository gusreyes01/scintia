import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { StepService } from '../../app/services/step.services';

@Component({
    selector: 'form-step-modal',
    templateUrl: 'form-step-modal.component.html',
    styleUrls: ['form-step-modal.component.scss']
})
export class FormStepModalComponent {


    myParameter: boolean;
    myOtherParameter: Date;
    myGroup: FormGroup;
    actualCycle;
    protocol;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private stepService: StepService,
    ) {

        this.myGroup = new FormGroup({
            description: new FormControl(),
            temperature: new FormControl(),
            time: new FormControl()
        });
        this.protocol = this.navParams.get('protocol');
        this.actualCycle = this.navParams.get('cycle');
    }
    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
    }
    save(formValue) {
        this.stepService.addStep(this.protocol, this.actualCycle, formValue);
        this.modalController.dismiss(this.myGroup);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }


}
