import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

class Cycle {
    id: number;
    name: any;
    repeat: number;
    expanded: boolean;
    steps: any;

    addStep(step) {
        return this.steps.push(step);
    }

}

@Injectable()
export class CycleService {

    public cycles: Cycle[] = [];
    pcrcycles: Cycle[];
    public protocols = [];
    public cycles2 = [];
    public cycles3 = [];

    constructor(
        private storage: Storage,
    ) {

        this.cycles = [

            {
                id: 1, name: 'Initial', repeat: 1, expanded: false, steps: [
                    {
                        time: 120.0,
                        temperature: 94.0,
                        description: 'Denaturation'
                    }
                ], addStep: Cycle.prototype.addStep
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
                }], addStep: Cycle.prototype.addStep
            },
            {
                id: 3, name: 'Final', repeat: 1, expanded: false, steps: [{
                    time: 60,
                    temperature: 72.0,
                    description: 'Extension'
                }], addStep: Cycle.prototype.addStep
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
                this.cyclesArray(this.cycles2);
                this.changeProtocol(protocol, this.cycles2);
            } else {
                this.cycles3 = this.cycles2;
                this.cycles3.push({
                    id: this.cycles3.length + 1, name: newCycle.name, expanded: newCycle.expanded, repeat: newCycle.repeat
                });
                this.storage.remove('cycle_' + protocol.id);
                this.storage.set('cycle_' + protocol.id, this.cycles3);
                this.cyclesArray(this.cycles3);
                this.changeProtocol(protocol, this.cycles3);
            }
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

    cyclesArray(cycles3) {
        this.cycles3 = cycles3;
    }

    changeProtocol(protocol, cycles3) {
        this.storage.get('protocols').then(protocols => {
            this.protocols = protocols;
            const proto = this.protocols[protocol.id - 1];
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
