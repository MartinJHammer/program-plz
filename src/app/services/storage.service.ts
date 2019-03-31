import * as localForage from 'localforage';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    public persist(key: string, data: any): Promise<any> {
        return localForage.setItem(key, data);
    }

    public retrieve(key: string): Promise<any> {
        return localForage.getItem(key);
    }
}
