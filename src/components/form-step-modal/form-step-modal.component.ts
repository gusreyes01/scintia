import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { StepService } from '../../app/services/step.services';
import { ProtocolService } from '../../app/services/protocol.services';

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
    id;
    step: any;
    description;
    temperature;
    time;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private protocolService: ProtocolService,
    ) {

        this.myGroup = new FormGroup({
            id: new FormControl(),
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
            this.id = this.step.id;
            this.description = this.step.description;
            this.temperature = this.step.temperature;
            this.time = this.step.time;
        }

    }
    save(formValue) {
        console.log(this.actualCycle)

        if (this.specialParameter === 1) {
            const param_step = {
                id: this.actualCycle.steps.length + 2,
                description: formValue.description,
                temperature: formValue.temperature,
                time: formValue.time,
            };

            this.protocol = this.protocolService.addStep(this.protocol, this.actualCycle, param_step);
        } else {
            formValue.id = this.step.id;
            this.protocol = this.protocolService.updateStep(this.protocol, this.actualCycle, formValue);
        }
        this.modalController.dismiss(this.protocol);
    }

    closeModal() {
        this.modalController.dismiss(null);
    }


}
