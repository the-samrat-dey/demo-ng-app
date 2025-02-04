import type { Routes } from '@angular/router';

import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserDetailsComponent } from './features/user/user-details.component';
import { UserListComponent } from './features/user/user-list.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: UserDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: '/dashboard',
  },
];
