import { bootstrapApplication } from '@angular/platform-browser';
import { HomepageComponent } from './app/Homepage/homepage.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(HomepageComponent, config);

export default bootstrap;
