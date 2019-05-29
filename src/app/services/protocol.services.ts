import { Injectable } from '@angular/core';
import { CycleService } from './cycle.services';
import { Storage } from '@ionic/storage';

class Protocol {
    id: any;
    title: string;
    cycles: any;

    // addCycle(cycle) {
    //     return this.cycles.push(cycle);
    // }

}


@Injectable()
export class ProtocolService {

    public protocols: Protocol[] = [];

    constructor(private cycleService: CycleService, private storage: Storage) {
        this.getProtocols().then(data => {
            this.protocols = data;
        });

    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    // Cycle Functions

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////


    addCycle(protocol, cycle) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                this.protocols[i].cycles.push(cycle);
                this.storage.set('protocols', this.protocols);
                return this.protocols[i];
            }
        }
    }


    deleteCycle(protocol, deleted_cycle) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                for (let j = 0; j < this.protocols[i].cycles.length; j++) {
                    if (this.protocols[i].cycles[j].id === deleted_cycle.id) {
                        console.log("found protocol to dlete");
                        this.protocols[i].cycles.splice(j, 1);
                        this.storage.set('protocols', this.protocols);
                        return this.protocols[i];

                    }
                }
            }
        }
    }

    updateCycle(protocol, updated_cycle) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                for (let j = 0; j < this.protocols[i].cycles.length; j++) {
                    if (this.protocols[i].cycles[j].id === updated_cycle.id) {
                        this.protocols[i].cycles[j] = updated_cycle;
                        this.storage.set('protocols', this.protocols);
                        return this.protocols[i].cycles;

                    }
                }
            }
        }
    }


    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    // Step Functions

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////


    addStep(protocol, cycle, step) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                for (let j = 0; j < this.protocols[i].cycles.length; j++) {
                    if (this.protocols[i].cycles[j].id === cycle.id) {
                        this.protocols[i].cycles[j].steps.push(step);
                        this.storage.set('protocols', this.protocols);
                        return this.protocols[i];
                    }
                }
            }
        }
    }


    deleteStep(protocol, cycle, deleted_step) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                for (let j = 0; j < this.protocols[i].cycles.length; j++) {
                    if (this.protocols[i].cycles[j].id === cycle.id) {
                        for (let k = 0; k < this.protocols[i].cycles[j].steps.length; k++) {
                            if (this.protocols[i].cycles[j].steps[k].id === deleted_step.id) {
                                this.protocols[i].cycles[j].steps.splice(k, 1);
                                this.storage.set('protocols', this.protocols);
                                return this.protocols[i];
                            }
                        }

                    }
                }
            }
        }
    }

    updateStep(protocol, cycle, updated_step) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === protocol.id) {
                for (let j = 0; j < this.protocols[i].cycles.length; j++) {
                    if (this.protocols[i].cycles[j].id === cycle.id) {
                        for (let k = 0; k < this.protocols[i].cycles[j].steps.length; k++) {
                            if (this.protocols[i].cycles[j].steps[k].id === updated_step.id) {
                                this.protocols[i].cycles[j].steps[k] = updated_step;
                                this.storage.set('protocols', this.protocols);
                                return this.protocols[i];
                            }
                        }
                    }

                }
            }
        }
    }



    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    // Protocol Functions

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    deleteProtocol(deleted_protocol) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === deleted_protocol.id) {
                this.protocols.splice(i, 1);
                this.storage.set('protocols', this.protocols);
                return this.protocols[i];
            }
        }

    }

    updateProtocol(updated_protocol) {
        for (let i = 0; i < this.protocols.length; i++) {
            if (this.protocols[i].id === updated_protocol.id) {
                this.protocols[i] = updated_protocol;
                this.storage.set('protocols', this.protocols);
                return this.protocols[i];
            }
        }
    }

    addProtocol(title) {
        this.protocols.push({
            id: this.protocols.length + 1, title: title,
            cycles: this.cycleService.getNewCycles(), // addCycle: Protocol.prototype.addCycle
        });

        this.storage.set('protocols', this.protocols);

        return this.protocols;

    }


    getProtocols() {

        return this.storage.get('protocols').then(data => {
            if (!data) {
                const brand_new_protocol = [

                    {
                        id: '1', title: 'PCR Protocol',
                        cycles: this.cycleService.getPCRCycles(), // addCycle: Protocol.prototype.addCycle
                    },
                ];

                this.storage.set('protocols', brand_new_protocol);
            }
            return data;
        });


    }



    getProtocol(id): Protocol {
        return this.protocols.find(protocol => protocol.id === '' + id);
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////


}
