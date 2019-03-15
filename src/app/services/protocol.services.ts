import { Injectable } from '@angular/core';
import { CycleService } from './cycle.services';

class Protocol {
    id: any;
    title: string;
    cycles: any;

    addCycle(cycle) {
        return this.cycles.push(cycle);
    }

}


@Injectable()
export class ProtocolService {

    public protocols: Protocol[] = [];

    constructor(private cycleService: CycleService) {
        this.protocols = [

            {
                id: '1', title: 'PCR Protocol',
                cycles: this.cycleService.getPCRCycles(), addCycle: Protocol.prototype.addCycle
            },
        ];
    }

    addProtocol(title) {
        this.protocols.push({
            id: this.protocols.length + 1, title: title,
            cycles: this.cycleService.getNewCycles(), addCycle: Protocol.prototype.addCycle
        });
    }

    getProtocol(id): Protocol {
        return this.protocols.find(protocol => protocol.id === '' + id);
    }

}
