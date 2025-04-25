import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './srt/components/login/login/login.component';
import { DashboardComponent } from './srt/components/dashboard/dashboard/dashboard.component';
import { UsuariosComponent } from './srt/components/usuarios/usuarios/usuarios.component';
import { ProyectosComponent } from './srt/components/proyectos/proyectos/proyectos.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige al login cuando no hay ruta
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protege la ruta con el AuthGuard
    children: [
      { path: 'inicio', component: UsuariosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'proyectos', component: ProyectosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }