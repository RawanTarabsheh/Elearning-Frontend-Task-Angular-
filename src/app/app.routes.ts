import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CareersComponent } from './pages/careers/careers';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'careers', component: CareersComponent },
  { path: '**', redirectTo: '' },
];
