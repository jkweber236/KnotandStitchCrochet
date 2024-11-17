import { Routes } from '@angular/router';
import { HomepageComponent } from './Homepage/homepage.component';
import { ShopComponent } from './Shop/shop.component';
import { AboutComponent } from './About/about.component';
import { ContactComponent } from './Contact/contact.component';
import { CartComponent } from './Cart/cart.component';
import { ProfileComponent } from './Profile/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' }, // Default route
  { path: 'homepage', component: HomepageComponent },
  { path: 'shop', component: ShopComponent }, // Shop page route
  { path: 'about', component: AboutComponent }, // About page route
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];
