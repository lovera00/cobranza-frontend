import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../enviroments/enviroment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
export interface LoginFormInterface {
  email?: string;
  password?: string;
  remember?: boolean;
}
const base_url = Environment.url;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${base_url}/auth/check-status`, { headers }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map((res: any) => {
        return true;
      }),
      catchError((err) => {
        return of(false);
      })
    )
  }

  login(formData: LoginFormInterface) {
    return this.http.post(`${base_url}/auth/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
