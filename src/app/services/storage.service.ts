import * as localForage from 'localforage';
import { Injectable } from '@angular/core';

/**
 * Use this class to persist data locally.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
    public persist(key: string, data: any): Promise<any> {
        return localForage.setItem(key, data);
    }

    public retrieve(key: string): Promise<any> {
        return localForage.getItem(key);
    }

    public delete(key: string): Promise<any> {
        return localForage.removeItem(key);
    }
}
