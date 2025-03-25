import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';

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
    { path: "login", component: LoginComponent },
    {
        path: '**',
        redirectTo: ''
    }
];
