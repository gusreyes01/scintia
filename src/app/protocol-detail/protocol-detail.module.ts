// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// This Module's Components
import { ProtocolDetailComponent } from './protocol-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProtocolDetailComponent
            }]),
    ],
    declarations: [
        ProtocolDetailComponent,
    ],
    exports: [
        ProtocolDetailComponent,
    ]

})
export class ProtocolDetailModule {

}
