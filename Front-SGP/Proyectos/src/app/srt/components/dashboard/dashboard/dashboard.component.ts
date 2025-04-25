import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  perfil!: any | null;

  constructor(private authService: AuthGuard, private router: Router) {}

  ngOnInit(): void {

  }

  cerrarSesion(): void {
    localStorage.removeItem('userToken'); // Elimina el token de localStorage
    this.router.navigate(['/login']);
  }

  tienePermiso(opcion: string): boolean {
    const permisos: { [key: string]: string[] } = {
      ADMIN: ['usuarios', 'clientes', 'proveedores', 'compras', 'ventas','productos'],
      EMPLEADO: ['clientes', 'compras', 'ventas','productos'],
      CLIENTE: ['ventas'],
    };
    if (!this.perfil || !this.perfil.nombre) {
      console.error('El perfil no está definido o no tiene nombre');
      return false;
    }
  
    const nombrePerfil = this.perfil.nombre.toUpperCase(); // Normaliza el nombre
    const permisosUsuario = permisos[nombrePerfil];
  
    if (!permisosUsuario) {
      console.warn(`No hay permisos definidos para el perfil: ${nombrePerfil}`);
      return false;
    }
  
    return permisosUsuario.includes(opcion);
  }
}