import { Routes } from '@angular/router';
import { HomepageComponent } from './Homepage/homepage.component';
import { ShopComponent } from './Shop/shop.component';
import { AboutComponent } from './About/about.component';
import { ContactComponent } from './Contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },  // Default route
  { path: 'shop', component: ShopComponent },   // Shop page route
  { path: 'about', component: AboutComponent }, // About page route
  { path: 'contact', component: ContactComponent }
];
