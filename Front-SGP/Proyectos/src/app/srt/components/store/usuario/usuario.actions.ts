import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/srt/modelos/usuario';

export const cargarUsuarios = createAction('[Usuario] Cargar usuarios');
export const cargarUsuariosSuccess = createAction(
  '[Usuario] Cargar usuarios Success',
  props<{ usuarios: Usuario[] }>()
);
export const cargarUsuariosFailure = createAction(
  '[Usuario] Cargar usuario Failure',
  props<{ error: any }>()
);

export const agregarUsuario = createAction(
  '[Usuario] Agregar usuario',
  props<{ usuario: Usuario }>()
);
export const agregarUsuarioSuccess = createAction(
  '[Usuario] Agregar usuario Success',
  props<{ usuario: Usuario }>()
);
export const agregarUsuarioFailure = createAction(
  '[Usuario] Agregar usuario Failure',
  props<{ error: any }>()
);

export const actualizarUsuario = createAction(
  '[Usuario] Actualizar usuario',
  props<{ usuario: Usuario }>()
);
export const actualizarUsuarioSuccess = createAction(
  '[Usuario] Actualizar usuario Success',
  props<{ usuario: Usuario }>()
);
export const actualizarUsuarioFailure = createAction(
  '[Usuario] Actualizar usuario Failure',
  props<{ error: any }>()
);

export const eliminarUsuario = createAction(
  '[Usuario] Eliminar usuario',
  props<{ id: number }>()
);
export const eliminarUsuarioSuccess = createAction(
  '[Usuario] Eliminar usuario Success',
  props<{ id: number }>()
);
export const eliminarUsuarioFailure = createAction(
  '[Usuario] Eliminar usuario Failure',
  props<{ error: any }>()
);
