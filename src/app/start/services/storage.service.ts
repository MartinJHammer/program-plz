import * as localforage from 'localforage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, timer } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';

/**
 * Use this class to persist data locally.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {

    protected subjects: { [key: string]: BehaviorSubject<any> } = {};

    public select(key: string, defaultValue: any = null, delay: number = 0): Observable<any> {
        if (this.subjects.hasOwnProperty(key)) {
            return this.subjects[key];
        }

        this.retrieve(key).then(data => {
            if (!data && defaultValue) {
                this.persist(key, JSON.stringify(defaultValue));
            }
        });

        return timer(delay).pipe(
            switchMap(() => from(this.retrieve(key).then(data => {
                const value = this.retrieve(key)
                    ? JSON.parse(data)
                    : defaultValue;
                return this.subjects[key] = new BehaviorSubject(value);
            })).pipe(flatMap(x => x)))
        );
    }


    public set(key: string, value: any): void {
        this.persist(key, JSON.stringify(value));

        if (this.subjects.hasOwnProperty(key)) {
            this.subjects[key].next(value);
        }
    }

    public remove(key: string): void {
        this.delete(key);

        if (this.subjects.hasOwnProperty(key)) {
            this.subjects[key].next(null);
        }
    }

    public wipeStorage(): void {
        this.subjects = {};
        localforage.clear();
    }

    private persist(key: string, data: any): Promise<any> {
        return this.ready(() => localforage.setItem(key, data));
    }

    private retrieve(key: string): Promise<any> {
        return this.ready(() => localforage.getItem(key));
    }

    private delete(key: string): Promise<any> {
        return this.ready(() => localforage.removeItem(key));
    }

    private ready(action: (...args) => Promise<any>): Promise<any> {
        return localforage.ready().then(() => {
            return action();
        });
    }
}
