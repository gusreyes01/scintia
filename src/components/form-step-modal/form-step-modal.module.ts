// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { FormStepModalComponent } from './form-step-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [
        FormStepModalComponent,
    ],
    exports: [
        FormStepModalComponent,
    ]
})
export class FormStepModalModule {

}
