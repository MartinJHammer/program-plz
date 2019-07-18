import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { StartModule } from './app/start/start.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(StartModule)
  .catch(err => console.error(err));
