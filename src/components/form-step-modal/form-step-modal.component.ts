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
    specialParameter: number;
    actualCycle;
    protocol;
    step: any;
    description;
    temperature;
    time;

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
    }
    ionViewWillEnter() {
        this.myParameter = this.navParams.get('aParameter');
        this.myOtherParameter = this.navParams.get('otherParameter');
        this.specialParameter = this.navParams.get('specialParameter');
        this.protocol = this.navParams.get('protocol');
        this.actualCycle = this.navParams.get('cycle');
        this.step = this.navParams.get('step');
        if (this.step) {
            this.description = this.step.description;
            this.temperature = this.step.temperature;
            this.time = this.step.time;
        }
    }
    save(formValue) {
        if (this.specialParameter === 1) {
            this.stepService.addStep(this.protocol, this.actualCycle, formValue);
        } else {
            this.stepService.editStep(this.protocol, this.actualCycle, this.step, formValue);
        }
        this.modalController.dismiss(this.myGroup);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }


}
