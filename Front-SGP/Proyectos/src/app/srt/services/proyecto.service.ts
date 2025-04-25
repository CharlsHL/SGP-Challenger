import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../modelos/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private apiUrl = 'http://localhost:5098/api/Proyect';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/GetAllProyectos`);
  }

  add(proyecto: Proyecto): Observable<Proyecto> {

    return this.http.post<Proyecto>(`${this.apiUrl}/CrearProyecto`, proyecto);
  }

  update(proyecto: Proyecto): Observable<Proyecto> {
    console.log(proyecto);
    debugger;
    return this.http.put<Proyecto>(`${this.apiUrl}/ActualizarProyecto`, proyecto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarProyecto?id=${id}`);
  }
}