import { Component, ViewChild } from '@angular/core';
import { Serial } from '@ionic-native/serial/ngx';
import { BaseChartDirective } from 'ng2-charts';
import { Location } from '@angular/common';


@Component({
    selector: 'chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ChartComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    constructor(private serial: Serial, private location: Location) {


    }

    public lineChartData: Array<any> = [
        { data: [], label: 'Time (Celsius)' },
    ];
    public lineChartLabels: Array<any> = [];

    public xAxis = 100;
    public lineChartOptions: any = {
        responsive: true,
        xAxes: [{
            type: 'time',
            time: {
                unit: 'second'
            }
        }]
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
        // for (let j = 0; j < 200; j++) {
        // this.lineChartData[0].data.push0;
        // const array = '5,90'.split(',');
        // this.lineChartData[0].data[array[0]] = array[1];
        //     this.chart.chart.update();
        // }
    }

    backButton() {
        this.location.back();
    }

    public randomUpdate() {

        let count = 0;
        setInterval(() => {
            const val2 = Math.floor(Math.random() * 100) + 1;
            // Something you want delayed.
            this.lineChartData[0].data.push(val2);
            this.lineChartLabels.push(count);
            if (count > 100) {
                this.lineChartData[0].shift();
            }
            this.chart.chart.update();
            count += 1;

        }, 1000);

    }

    // events
    public chartClicked(e: any): void {
        // this.randomUpdate();

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
                    let count = 0;
                    // Create a Int8Array view referring to the buffer
                    const view = new Uint8Array(buffer);
                    const string = new TextDecoder('utf-8').decode(view);
                    const array = string.split(',');
                    this.lineChartData[0].data.push(array[1]);
                    this.lineChartLabels.push(count);
                    if (count > 100) {
                        this.lineChartData[0].shift();
                    }
                    this.chart.chart.update();
                    count += 1;

                });

            }).catch((error: any) => alert(error));
        }).catch((error: any) => alert(error));

    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
