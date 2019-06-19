import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({ providedIn: 'root' })
export class PwaService {
    public promptEvent: any;

    constructor(private swUpdate: SwUpdate) {
        this.swUpdate.available.subscribe(event => {
            window.location.reload();
        });

        window.addEventListener('beforeinstallprompt', event => {
            this.promptEvent = event;
        });
    }

    installPwa(): void {
        this.promptEvent.prompt();
    }

    // Put this in the settings area somewhere.
    // <button mat-raised-button color="accent" *ngIf="pwa.promptEvent" (click)="pwa.installPwa()">
    //     Install program - plz on your! :D
    // </button>
}
