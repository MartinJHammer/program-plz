import { Entry } from '../models/entry';
import * as localForage from 'localforage';

export abstract class Table<T extends Entry> {
    protected entries: T[] = [];

    constructor(
        protected key: string
    ) {
        this.seedIfEmpty();
    }

    abstract seed(): void;

    public get(id: string): T | undefined {
        return this.entries.find(entry => entry.id === id);
    }

    public getAll(): T[] {
        return this.entries;
    }

    public add(value: T): T {
        value.id = this.generateGUID();
        this.entries.push(value);
        this.persist();
        return value;
    }

    public addRange(values: T[]) {
        values.forEach(value => this.add(value));
    }

    public update(value: T): T {
        const oldValue = this.get(value.id);
        if (oldValue) {
            const newValue = Object.assign(oldValue, value);
            this.persist();
            return newValue;
        } else {
            return value;
        }
    }

    public delete(value: T): T | undefined {
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
        this.retrieve().then((values: T[]) => {
            values.length === 0 ? this.seed() : this.entries = values;
        });
    }
}
