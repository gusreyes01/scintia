import { Injectable } from '@angular/core';

interface Step {
    id: number;
    time: number;
    temperature: number;
}

@Injectable()
export class StepService {

    public steps: Step[] = [];

    constructor() {

        this.steps = [{
            id: 1,
            time: 60,
            temperature: 30
        }, {
            id: 2,
            time: 60,
            temperature: 30
        }];


    }

}