// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// This Module's Components
import { ChartComponent } from './chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChartsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ChartComponent
            }]),
    ],
    declarations: [
        ChartComponent,
    ],
    exports: [
        ChartComponent,
    ]
})
export class ChartModule {

}


