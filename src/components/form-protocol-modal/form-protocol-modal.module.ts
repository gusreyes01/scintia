// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { FormProtocolModalComponent } from './form-protocol-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [
        FormProtocolModalComponent,
    ],
    exports: [
        FormProtocolModalComponent,
    ]
})
export class FormProtocolModalModule {

}
