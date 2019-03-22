import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

class Step {
    id: number;
    name: any;
    time: number;
    temperature: number;
}

@Injectable()
export class StepService {

    public steps: Step[] = [];
    public protocols = [];
    public cycles = [];
    public steps2 = [];
    public steps3 = [];

    constructor(
        private storage: Storage,
    ) {
        /*this.steps = [{
            id: 1,
            time: 60,
            temperature: 30
        }, {
            id: 2,
            time: 60,
            temperature: 30
        }];*/
    }

    addStep(protocol, cycle, newStep) {
        this.storage.get('step_' + cycle.id).then(steps => {
            this.steps2 = steps;
            if (!this.steps2) {
                this.steps2 = [];
                this.steps2.push({
                    id: 1, description: newStep.description, temperature: newStep.temperature, time: newStep.time
                });
                this.storage.remove('step_' + cycle.id);
                this.storage.set('step_' + cycle.id, this.steps2);
                this.changeCycle(protocol, cycle, this.steps2);
            } else {
                this.steps3 = this.steps2;
                this.steps3.push({
                    id: this.steps3.length + 1, description: newStep.description, temperature: newStep.temperature, time: newStep.time
                });
                this.storage.remove('step_' + cycle.id);
                this.storage.set('step_' + cycle.id, this.steps3);
                this.changeCycle(protocol, cycle, this.steps3);
            }
        });
    }

    changeCycle(protocol, cycle, steps3) {
        this.storage.get('protocols').then(protocols => {
            this.protocols = protocols;
            this.storage.get('cycle_' + protocol.id).then(cycles => {
                this.cycles = cycles;
                const newCycle = {
                    id: cycle.id,
                    name: cycle.name,
                    expanded: cycle.expanded,
                    repeat: cycle.repeat,
                    steps: steps3,
                };
                this.cycles[cycle.id - 1] = newCycle;
                this.storage.remove('cycle_' + protocol.id);
                this.storage.set('cycle_' + protocol.id, this.cycles);
                const newProto = {
                    id: protocol.id,
                    title: protocol.title,
                    cycles: this.cycles,
                };
                this.protocols[protocol.id - 1] = newProto;
                this.storage.remove('protocols');
                this.storage.set('protocols', this.protocols);
            });
        });
    }
}
