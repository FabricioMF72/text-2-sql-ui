import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./pages/home/home.component').then(m => m.HomeComponent);
        }
    },
    {
        path: 'dashboard',
        loadComponent() {
            return import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent);
        }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
