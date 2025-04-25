import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUsuarios } from '../../store/usuario/usuario.selectors';
import { Usuario } from 'src/app/srt/modelos/usuario';
import { actualizarUsuario, agregarUsuario, cargarUsuarios, eliminarUsuario } from '../../store/usuario/usuario.actions';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  estados = ['Activo', 'En pausa', 'Finalizado'];

  // filtros como string, cadena vacía = “sin filtro”
  estadoFiltro: string = '';
  nombreFiltro: string = '';

  mostrarModal = false;
  fromUsuarios: FormGroup;
  usuarioSelecionado: Usuario | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.fromUsuarios = this.fb.group({
      nombre: [''],
      email: [''],
      estado: [''],
      contraseña: [''],
      fechaRegistro: [''],
    });
  }

  ngOnInit() {
    // 1) cargamos usuarios
    this.store.dispatch(cargarUsuarios());

    // 2) al llegar datos, asignamos y aplicamos filtros
    this.store.select(selectUsuarios)
      .subscribe((usuarios) => {
        this.usuarios = usuarios;
        this.aplicarFiltros();     // <- aquí!
      });
  }

  aplicarFiltros() {
    this.usuariosFiltrados = this.usuarios.filter(u =>
      // Si nombreFiltro es cadena vacía mostramos todo, si no, filtramos por coincidencia
      (this.nombreFiltro.trim().length === 0 ||
       u.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase())
      )
      &&
      // Si estadoFiltro es cadena vacía mostramos todo, si no, filtramos por igualdad
      (this.estadoFiltro.trim().length === 0 ||
       u.estado === this.estadoFiltro
      )
    );
  }

  abrirModal() {
    debugger;
    this.usuarioSelecionado = null;
    this.fromUsuarios.reset();
    this.mostrarModal = true;
    this.ajustarModal();
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.fromUsuarios.patchValue(usuario);
    this.mostrarModal = true;
    this.ajustarModal();
  }

  guardarUsuario() {
    const usuario = this.fromUsuarios.value;
    if (this.usuarioSelecionado) {
      this.store.dispatch(actualizarUsuario({
        usuario: { ...this.usuarioSelecionado, ...usuario }
      }));
    } else {
      this.store.dispatch(agregarUsuario({ usuario }));
    }
    this.mostrarModal = false;
    // no llamamos aquí a aplicarFiltros(): lo hace el subscribe
  }

  eliminarUsuario(id: number) {
    this.store.dispatch(eliminarUsuario({ id }));
  }

  private ajustarModal() {
    setTimeout(() => {
      const modal = document.querySelector('.p-dialog') as HTMLElement;
      if (modal) {
        modal.style.width = '100%';
        modal.style.maxWidth = '600px';
      }
    }, 0);
  }
}
