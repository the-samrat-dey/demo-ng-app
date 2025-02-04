import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',
  TIMEOUT: 30000,
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  private createHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${API_CONFIG.BASE_URL}${url}`);
  }
}
