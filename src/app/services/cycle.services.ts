import { Injectable } from '@angular/core';

class Cycle {
    id: number;
    name: any;
    repeat: number;
    expanded: boolean;
    steps: any;

    // addStep(step) {
    //     return this.steps.push(step);
    // }

    // findStep(id) {
    //     return this.steps.find(step => step.id === id);
    // }

}

@Injectable()
export class CycleService {

    public cycles: Cycle[] = [];
    pcrcycles: Cycle[];

    constructor() {

        this.cycles = [

            {
                id: 1, name: 'Initial', repeat: 1, expanded: false, steps: [
                    {
                        time: 120.0,
                        temperature: 94.0,
                        description: 'Denaturation'
                    }
                ]//, addStep: Cycle.prototype.addStep, findStep: Cycle.prototype.findStep
            },
            {
                id: 2, name: 'Middle', repeat: 30, expanded: false, steps: [{
                    time: 30,
                    temperature: 94.0,
                    description: 'Denaturation'
                }, {
                    time: 30,
                    temperature: 60.0,
                    description: 'Annealing'
                }, {
                    time: 30,
                    temperature: 72.0,
                    description: 'Extension'
                }]//, addStep: Cycle.prototype.addStep, findStep: Cycle.prototype.findStep
            },
            {
                id: 3, name: 'Final', repeat: 1, expanded: false, steps: [{
                    time: 60,
                    temperature: 72.0,
                    description: 'Extension'
                }]//, addStep: Cycle.prototype.addStep, findStep: Cycle.prototype.findStep
            },
        ];


    }

    getPCRCycles() {
        this.pcrcycles = [this.getCycle(1), this.getCycle(2), this.getCycle(3)];
        return this.pcrcycles;
    }

    getCycles() {
        return this.cycles;
    }

    getNewCycles() {
        return [];
    }

    getCycle(id): Cycle {
        return this.cycles.find(cycle => cycle.id === id);
    }

    pushCycle(cycle) {
        this.cycles.push(cycle);
    }



}
