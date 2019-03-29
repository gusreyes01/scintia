import { Injectable } from '@angular/core';
import { CycleService } from './cycle.services';
import { Storage } from '@ionic/storage';

class Protocol {
    id: any;
    title: string;
    cycles: any;

    /*addCycle(cycle) {
        return this.cycles.push(cycle);
    }*/

}


@Injectable()
export class ProtocolService {

    public protocols: Protocol[] = [];
    public protocols2 = [];
    public cycles2 = [];
    public steps2 = [];
    constructor(
        private cycleService: CycleService,
        private storage: Storage,
    ) {
        this.storage.get('protocols').then(data => {
            this.protocols = data;
            if (!this.protocols) {
                this.protocols = [
                    {
                        id: 1, title: 'PCR Protocol',
                        cycles: this.cycleService.getPCRCycles()
                    },
                ];
                this.storage.set('protocols', this.protocols);
            }
        });
    }

    addProtocol(title) {
        return this.storage.get('protocols').then(protocols => {
            this.protocols2 = protocols;
            this.protocols2.push({
                id: this.protocols.length + 1, title: title
            });
            this.storage.remove('protocols');
            this.storage.set('protocols', this.protocols2);
            this.protocolsArray(this.protocols2);
            return this.protocols2;
        });
    }

    editProtocol(protocol, title) {
        return this.storage.get('protocols').then(protocols => {
            this.protocols2 = protocols;
            const newProto = {
                id: protocol.id,
                title: title.title,
                cycles: protocol.cycles
            };
            this.protocols2[protocol.id - 1] = newProto;
            this.storage.remove('protocols');
            this.storage.set('protocols', this.protocols2);
            return this.protocols2;
        });
    }

    deleteProtocol(protocol, i) {
        return this.storage.get('protocols').then(protocols => {
            this.protocols2 = protocols;
            this.storage.get('cycle_' + protocol.id).then(cycles => {
                this.cycles2 = cycles;
                for (const c of this.cycles2) {
                    this.storage.remove('step_' + c.id);
                }
                this.storage.remove('cycle_' + protocol.id);
            });
            this.protocols2.splice(i, 1);
            this.storage.remove('protocols');
            this.storage.set('protocols', this.protocols2);
            return this.protocols2;
        });
    }

    protocolsArray(protocols2) {
        this.protocols2 = protocols2;
    }

    getProtocol(id): Protocol {
        return this.protocols2.find(protocol => protocol.id === '' + id);
    }

}
