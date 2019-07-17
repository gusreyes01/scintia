// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { FormModalComponent } from './form-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    exports: [
        FormModalComponent,
    ],
    declarations: [
        FormModalComponent,
    ],
})
export class FormModalModule {

}
