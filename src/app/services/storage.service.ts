import * as localForage from 'localforage';
import { Injectable } from '@angular/core';

// Note: Needs a bit of refactoring to be of use.

@Injectable({ providedIn: 'root' })
export class StorageService {

    public entries: any[];

    constructor(
        protected key: string
    ) {
        this.seedIfEmpty();
    }

    public get(id: string): any | undefined {
        return this.entries.find(entry => entry.id === id);
    }

    public getAll(): any[] {
        return this.entries;
    }

    public add(value: any): any {
        value.id = this.generateGUID();
        this.entries.push(value);
        this.persist();
        return value;
    }

    public addRange(values: any[]) {
        values.forEach(value => this.add(value));
    }

    public update(value: any): any {
        const oldValue = this.get(value.id);
        if (oldValue) {
            const newValue = Object.assign(oldValue, value);
            this.persist();
            return newValue;
        } else {
            return value;
        }
    }

    public delete(value: any): any | undefined {
        const index = this.entries.findIndex(entry => entry.id === value.id);
        const removedValue = this.entries[index];
        this.entries.splice(index, 1);
        this.persist();
        return removedValue;
    }

    public purge(): void {
        this.entries = [];
        this.persist();
    }

    private generateGUID() {
        const r = (new Date()).getTime().toString(16) +
            Math.random().toString(16).substring(2) + '0'.repeat(16);
        return r.substr(0, 8) + '-' + r.substr(8, 4) + '-4000-8' +
            r.substr(12, 3) + '-' + r.substr(15, 12);
    }

    private persist() {
        localForage.setItem(this.key, this.entries);
    }

    private retrieve(): Promise<{}> {
        return localForage.getItem(this.key);
    }

    private seedIfEmpty() {
        // this.retrieve().then((values: T[]) => {
        //     values && values.length === 0 ? this.seed() : this.entries = values;
        // });
    }
}
