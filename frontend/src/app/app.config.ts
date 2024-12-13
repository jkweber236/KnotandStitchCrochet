import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDE2ZQ-1NCl-JmFgTB_iiuJUPsOm4ao7zw',
  authDomain: 'knot-and-stitch-crochet.firebaseapp.com',
  projectId: 'knot-and-stitch-crochet',
  storageBucket: 'knot-and-stitch-crochet.firebasestorage.app',
  messagingSenderId: '146079792953',
  appId: '1:146079792953:web:1251c3c67c6c2439c9b2e8',
  measurementId: 'G-XKVB7S4EY7',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
