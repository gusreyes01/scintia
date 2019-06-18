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
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Temperature (Celsis)' },
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

    public randomize(): void {
        for (let i = 0; i < this.lineChartData.length; i++) {
            this._lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                this._lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = this._lineChartData;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);

        this.serial.requestPermission().then(() => {
            this.serial.open({
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 0,
                dtr: true,
                rts: true,
                sleepOnPause: false
            }).then(() => {
                alert('Conection Established');
                console.log('Serial connection opened');

                this.serial.registerReadCallback().subscribe((buffer) => {
                    //Create a Int8Array view referring to the buffer 
                    const view = new Uint8Array(buffer);
                    const string = new TextDecoder("utf-8").decode(view);
                    alert(string);
                    this._lineChartData.push(view);
                    this.chart.chart.update();
                });


            }).catch((error: any) => alert(error));
        }).catch((error: any) => alert(error));

    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
