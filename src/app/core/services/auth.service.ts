import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { ICredentials } from '../../features/auth/auth.model';
import type { IUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<IUser | null>(null);

  signin(credentials: ICredentials) {
    return this.http;
  }
}
