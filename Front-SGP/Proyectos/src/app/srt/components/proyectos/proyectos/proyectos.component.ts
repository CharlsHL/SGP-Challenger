import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Proyecto } from 'src/app/srt/modelos/proyecto';
import { Usuario } from 'src/app/srt/modelos/usuario';
import { actualizarProyecto, agregarProyecto, cargarProyectos, eliminarProyecto } from '../../store/proyecto/proyecto.actions';
import { selectProyectos } from '../../store/proyecto/proyecto.selectors';
import { selectUsuarios } from '../../store/usuario/usuario.selectors';
import { cargarUsuarios } from '../../store/usuario/usuario.actions';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = []; 
  proyectosFiltrados: Proyecto[] = [];
  usuarios : Usuario[] = [];
  estados = ['Activo', 'En pausa', 'Finalizado'];

  usuarioFiltro = '';
  estadoFiltro = '';
  nombreFiltro = '';

  mostrarModal = false;
  formProyecto: FormGroup;
  proyectoSeleccionado: Proyecto | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.formProyecto = this.fb.group({
      titulo: [''],
      descripcion: [''],
      usuarioId: [''],
      estado: [''],
      fechaInicio :[''],
      fechaFin :['']
    });
  }

  ngOnInit() {
    this.cargarProyectos();
    this.cargarUsuarios();
  }

  aplicarFiltros() {
    this.proyectosFiltrados = this.proyectos.filter(p =>
      (!this.nombreFiltro || p.titulo.toLowerCase().includes(this.nombreFiltro.toLowerCase())) &&
      (!this.usuarioFiltro || p.usuarioId === this.usuarioFiltro) &&
      (!this.estadoFiltro || p.estado === this.estadoFiltro)
    );
  }

  abrirModal() {  
    this.proyectoSeleccionado = null;
    this.formProyecto.reset();
    this.mostrarModal = true;
     // Cambiar el tamaño del modal directamente con JavaScript
    setTimeout(() => {
      const modal = document.querySelector('.p-dialog') as HTMLElement;
      if (modal) {
        modal.style.width = '100%';
        modal.style.maxWidth = '600px';
      }
    }, 0);
  }

  editarProyecto(proyecto: Proyecto) {
    console.log(proyecto);
    this.proyectoSeleccionado = proyecto;
  
    // Convertimos las cadenas ISO a objetos Date
    const inicio = new Date(proyecto.fechaInicio);
    const fin    = new Date(proyecto.fechaFin);
  
    this.formProyecto.patchValue({
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      usuarioId: proyecto.usuarioId,
      estado: proyecto.estado,
      fechaInicio: inicio,
      fechaFin: fin
    });
  
    this.mostrarModal = true;
    setTimeout(() => {
      const modal = document.querySelector('.p-dialog') as HTMLElement;
      if (modal) {
        modal.style.width = '100%';
        modal.style.maxWidth = '600px';
      }
    }, 0);
  }
  guardarProyecto() {
    const proyecto = this.formProyecto.value;
    console.log(proyecto);
    if (this.proyectoSeleccionado) {
      this.store.dispatch(actualizarProyecto({ proyecto: { ...this.proyectoSeleccionado, ...proyecto } }));
    } else {
      this.store.dispatch(agregarProyecto({ proyecto }));
    }
    this.mostrarModal = false;
  }

  eliminarProyecto(id: number) {
    this.store.dispatch(eliminarProyecto({ id }));
  }

  cargarProyectos(){
    this.store.dispatch(cargarProyectos());
    this.store.select(selectProyectos).subscribe((proyectos) => {
      this.proyectos = proyectos;
      this.aplicarFiltros();
    });
  }

  cargarUsuarios(){
    this.store.dispatch(cargarUsuarios());
    this.store.select(selectUsuarios).subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.aplicarFiltros();
    });
  }
}