import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

class Step {
    id: number;
    description: any;
    time: number;
    temperature: number;
}

@Injectable()
export class StepService {

    public stepsCycle1: Step[] = [];
    public stepsCycle2: Step[] = [];
    public stepsCycle3: Step[] = [];
    prcsteps1: Step[];
    prcsteps2: Step[];
    prcsteps3: Step[];
    public protocols = [];
    public cycles = [];
    public steps2 = [];
    public steps3 = [];

    constructor(
        private storage: Storage,
    ) {
        this.stepsCycle1 = [{
            id: 1,
            time: 120.0,
            temperature: 94.0,
            description: 'Denaturation'
        }];
        this.stepsCycle2 = [{
            id: 1,
            time: 30,
            temperature: 94.0,
            description: 'Denaturation'
        },
        {
            id: 2,
            time: 30,
            temperature: 60.0,
            description: 'Annealing'
        },
        {
            id: 3,
            time: 30,
            temperature: 72.0,
            description: 'Extension'
        }];
        this.stepsCycle3 = [{
            id: 1,
            time: 60,
            temperature: 72.0,
            description: 'Extension'
        }];
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

    editStep(protocol, cycle, step, data) {
        this.storage.get('step_' + cycle.id).then(steps => {
            this.steps2 = steps;
            const newStep = {
                id: step.id, description: data.description, temperature: data.temperature, time: data.time
            };
            this.steps2[step.id - 1] = newStep;
            this.storage.remove('step_' + cycle.id);
            this.storage.set('step_' + cycle.id, this.steps2);
            this.changeCycle(protocol, cycle, this.steps2);
        });
    }

    deleteStep(protocol, cycle, step, j) {
        this.storage.get('step_' + cycle.id).then(steps => {
            this.steps2 = steps;
            this.steps2.splice(j, 1);
            this.storage.remove('step_' + cycle.id);
            this.storage.set('step_' + cycle.id, this.steps2);
            this.changeCycle(protocol, cycle, this.steps2);
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

    getPCRSteps1() {
        this.prcsteps1 = [this.getSteps1(1)];
        return this.prcsteps1;
    }

    getPCRSteps2() {
        this.prcsteps2 = [this.getSteps2(1), this.getSteps2(2), this.getSteps2(3)];
        return this.prcsteps2;
    }

    getPCRSteps3() {
        this.prcsteps3 = [this.getSteps3(1)];
        return this.prcsteps3;
    }

    getSteps1(id): Step {
        return this.stepsCycle1.find(step => step.id === id);
    }

    getSteps2(id): Step {
        return this.stepsCycle2.find(step => step.id === id);
    }

    getSteps3(id): Step {
        return this.stepsCycle3.find(step => step.id === id);
    }
}
