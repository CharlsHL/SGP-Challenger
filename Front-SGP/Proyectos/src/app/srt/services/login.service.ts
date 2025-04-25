import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5098/api/User/login';
  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, contraseña: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { nombreUsuario, contraseña });
  }
}
