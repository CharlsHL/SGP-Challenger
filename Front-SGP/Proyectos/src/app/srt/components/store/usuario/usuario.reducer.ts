import { createReducer, on } from '@ngrx/store';
import * as UsuarioActions from './usuario.actions';
import { Usuario } from 'src/app/srt/modelos/usuario';

export interface UsuarioState {
  usuarios: Usuario[];
  loading: boolean;
  error: any;
}

export const initialState: UsuarioState = {
  usuarios: [],
  loading: false,
  error: null,
};

export const usuarioReducer = createReducer(
  initialState,

  // Cargar usuarios
  on(UsuarioActions.cargarUsuarios, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuarioActions.cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    usuarios,
    loading: false
  })),
  on(UsuarioActions.cargarUsuariosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Agregar usuario
  on(UsuarioActions.agregarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    usuarios: [...state.usuarios, usuario]
  })),

  // Actualizar usuario
  on(UsuarioActions.actualizarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    usuarios: state.usuarios.map(u => u.id === usuario.id ? usuario : u)
  })),

  // Eliminar usuario
  on(UsuarioActions.eliminarUsuarioSuccess, (state, { id }) => ({
    ...state,
    usuarios: state.usuarios.filter(u => u.id !== id)
  }))
);
