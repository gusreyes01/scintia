import { Component, ViewChild } from '@angular/core';
import { Serial } from '@ionic-native/serial/ngx';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ChartComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    constructor(private serial: Serial) { }


    public lineChartData: Array<any> = [
        { data: [], label: 'Temperature (Celsis)' },
    ];

    public _lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = ['0', '10', '15', '20', '25', '30', '35'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [

        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },

    ];
    public lineChartLegend = true;
    public lineChartType = 'line';


    public ngOnInit() {
        for (let j = 0; j < 100; j++) {
            this.lineChartData[0].data[j] = 5;
        }
    }


    // events
    public chartClicked(e: any): void {


        this.serial.requestPermission().then(() => {
            this.serial.open({
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 0,
                dtr: false,
                rts: false,
                sleepOnPause: false
            }).then(() => {
                alert('Conection Established');
                console.log('Serial connection opened');
                let val;

                // val = '1x\n\r';
                val = '#*1%94,120%**30%94,30,60,30,72,30,12,12,12,12%**1%72,60%*#' + '\n\r';

                this.serial.write(val).then(() => {
                    alert('Writing : \n' + val);
                }).catch((error: any) => alert(error));

                this.serial.registerReadCallback().subscribe((buffer) => {
                    // Create a Int8Array view referring to the buffer
                    const view = new Uint8Array(buffer);
                    const string = new TextDecoder('utf-8').decode(view);
                    alert(string);
                    this._lineChartData.push(view);
                });


            }).catch((error: any) => alert(error));
        }).catch((error: any) => alert(error));

    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
