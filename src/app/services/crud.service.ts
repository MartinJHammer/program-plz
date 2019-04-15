import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CrudService {

    constructor() { this.init(); }

    public init(): void {
    }

    public scrollHandler(event: any): void {
        console.log(event);
    }
}
