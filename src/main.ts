import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Sentry.init({
  dsn: 'https://3d50ec0e9b38ac309704d8721bd7a5b5@o4509981622796288.ingest.de.sentry.io/4509981773070416',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  environment: 'development',
  debug: true,
  tracesSampleRate: 1.0,
});

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error(err);
  Sentry.captureException(err);
});
