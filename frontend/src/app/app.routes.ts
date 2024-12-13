import { Routes } from '@angular/router';
import { HomepageComponent } from './Homepage/homepage.component';
import { ShopComponent } from './Shop/shop.component';
import { AboutComponent } from './About/about.component';
import { ContactComponent } from './Contact/contact.component';
import { CartComponent } from './Cart/cart.component';
import { ProfileComponent } from './Profile/profile.component';
import { ProductComponent } from './Product/product.component';
import { CreateAccountComponent } from './CreateAccount/create-account.component';
import { LoginComponent } from './Login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' }, // Default route
  { path: 'homepage', component: HomepageComponent },
  { path: 'shop', component: ShopComponent }, // Shop page route
  { path: 'about', component: AboutComponent }, // About page route
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
];
