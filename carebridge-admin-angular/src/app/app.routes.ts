import { Routes } from '@angular/router';
import { AuthGuardPathService } from './auth/services/auth-guard-path.service';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LayoutModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardPathService] },
    { path: '**', redirectTo: '' }
];