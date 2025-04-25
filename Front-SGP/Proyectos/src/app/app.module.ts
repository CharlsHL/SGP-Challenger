import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Formularios reactivos
import { StoreModule } from '@ngrx/store';  // NGRX
import { EffectsModule } from '@ngrx/effects';  // Efectos NGRX
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';  // Importar RouterModule
import { AppRoutingModule } from './app-routing.module';  // Importar el módulo de enrutamiento

// Importación de PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

// Reducer y Efectos de NGRX
import { loginReducer } from './srt/components/store/login/login.reducer';  // Reducer de login
import { LoginEffects } from './srt/components/store/login/login.effects';// Efectos de login
import { AppComponent } from './app.component';
import { LoginComponent } from './srt/components/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './srt/components/dashboard/dashboard/dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProyectosComponent } from './srt/components/proyectos/proyectos/proyectos.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './srt/components/usuarios/usuarios/usuarios.component';
import { proyectoReducer } from './srt/components/store/proyecto/proyecto.reducer';
import { ProyectoEffects } from './srt/components/store/proyecto/proyecto.effects';
import { usuarioReducer } from './srt/components/store/usuario/usuario.reducer';
import { UsuarioEffects } from './srt/components/store/usuario/usuario.effects';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProyectosComponent,
    UsuariosComponent
  ],
  imports: [
    AppRoutingModule, 
    RouterModule ,
    BrowserModule,
    ReactiveFormsModule,  
    StoreModule.forRoot({ login: loginReducer }),  // Reducer de NGRX
    StoreModule.forFeature('proyectos', proyectoReducer),
    StoreModule.forFeature('usuarios', usuarioReducer),
    //StoreModule.forFeature('usuarios', usuarioReducer),
    EffectsModule.forRoot([LoginEffects, ProyectoEffects,UsuarioEffects]),  // ✅ Correcto
    CalendarModule,
    AppRoutingModule, 
    ButtonModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    ToastModule,
    InputTextareaModule,
    DropdownModule, 
    DialogModule,
    TableModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
