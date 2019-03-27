import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StepService } from './step.services';

class Cycle {
    id: number;
    name: any;
    repeat: number;
    expanded: boolean;
    steps: any;

    /*addStep(step) {
        return this.steps.push(step);
    }*/

}

@Injectable()
export class CycleService {

    public cycles: Cycle[] = [];
    pcrcycles: Cycle[];
    public protocols = [];
    public cycles2 = [];
    public cycles3 = [];
    public cycle = [];

    constructor(
        private storage: Storage,
        private stepService: StepService,
    ) {

        this.cycles = [

            {
                id: 1, name: 'Initial', repeat: 1, expanded: false, steps: this.stepService.getPCRSteps1()
            },
            {
                id: 2, name: 'Middle', repeat: 30, expanded: false, steps: this.stepService.getPCRSteps2()
            },
            {
                id: 3, name: 'Final', repeat: 1, expanded: false, steps: this.stepService.getPCRSteps3()
            },
        ];
    }

    getPCRCycles() {
        this.pcrcycles = [this.getCycle(1), this.getCycle(2), this.getCycle(3)];
        return this.pcrcycles;
    }

    addCycle(protocol, newCycle) {
        this.storage.get('cycle_' + protocol.id).then(cycles => {
            this.cycles2 = cycles;
            if (!this.cycles2) {
                this.cycles2 = [];
                this.cycles2.push({
                    id: 1, name: newCycle.name, expanded: newCycle.expanded, repeat: newCycle.repeat
                });
                this.storage.remove('cycle_' + protocol.id);
                this.storage.set('cycle_' + protocol.id, this.cycles2);
                this.changeProtocol(protocol, this.cycles2);
            } else {
                this.cycles3 = this.cycles2;
                this.cycles3.push({
                    id: this.cycles3.length + 1, name: newCycle.name, expanded: newCycle.expanded, repeat: newCycle.repeat
                });
                this.storage.remove('cycle_' + protocol.id);
                this.storage.set('cycle_' + protocol.id, this.cycles3);
                this.changeProtocol(protocol, this.cycles3);
            }
        });
    }

    editCycle(protocol, cycle, data) {
        this.storage.get('cycle_' + protocol.id).then(cycles => {
            this.cycles2 = cycles;
            const newCycle = {
                id: cycle.id, name: data.name, expanded: cycle.expanded, repeat: data.repeat, steps: cycle.steps
            };
            this.cycles2[cycle.id - 1] = newCycle;
            this.storage.remove('cycle_' + protocol.id);
            this.storage.set('cycle_' + protocol.id, this.cycles2);
            this.changeProtocol(protocol, this.cycles2);
        });
    }

    deleteCycle(protocol, cycle) {
        this.storage.get('cycle_' + protocol.id).then(cycles => {
            this.cycles2 = cycles;
            this.storage.remove('step_' + cycle.id);
            const deleteCycle = this.cycles2[cycle.id - 1];
            this.cycles2.splice(deleteCycle.id - 1, 1);
            this.storage.remove('cycle_' + protocol.id);
            this.storage.set('cycle_' + protocol.id, this.cycles2);
            this.changeProtocol(protocol, this.cycles2);
        });
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

    changeProtocol(protocol, cycles3) {
        this.storage.get('protocols').then(protocols => {
            this.protocols = protocols;
            const newProto = {
                id: protocol.id,
                title: protocol.title,
                cycles: cycles3
            };
            this.protocols[protocol.id - 1] = newProto;
            this.storage.remove('protocols');
            this.storage.set('protocols', this.protocols);
        });
    }

}
