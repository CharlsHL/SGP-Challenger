import { createAction, props } from '@ngrx/store';
import { Proyecto } from 'src/app/srt/modelos/proyecto';

export const cargarProyectos = createAction('[Proyecto] Cargar proyectos');
export const cargarProyectosSuccess = createAction(
  '[Proyecto] Cargar proyectos Success',
  props<{ proyectos: Proyecto[] }>()
);
export const cargarProyectosFailure = createAction(
  '[Proyecto] Cargar proyectos Failure',
  props<{ error: any }>()
);

export const agregarProyecto = createAction(
  '[Proyecto] Agregar proyecto',
  props<{ proyecto: Proyecto }>()
);
export const agregarProyectoSuccess = createAction(
  '[Proyecto] Agregar proyecto Success',
  props<{ proyecto: Proyecto }>()
);
export const agregarProyectoFailure = createAction(
  '[Proyecto] Agregar proyecto Failure',
  props<{ error: any }>()
);

export const actualizarProyecto = createAction(
  '[Proyecto] Actualizar proyecto',
  props<{ proyecto: Proyecto }>()
);
export const actualizarProyectoSuccess = createAction(
  '[Proyecto] Actualizar proyecto Success',
  props<{ proyecto: Proyecto }>()
);
export const actualizarProyectoFailure = createAction(
  '[Proyecto] Actualizar proyecto Failure',
  props<{ error: any }>()
);

export const eliminarProyecto = createAction(
  '[Proyecto] Eliminar proyecto',
  props<{ id: number }>()
);
export const eliminarProyectoSuccess = createAction(
  '[Proyecto] Eliminar proyecto Success',
  props<{ id: number }>()
);
export const eliminarProyectoFailure = createAction(
  '[Proyecto] Eliminar proyecto Failure',
  props<{ error: any }>()
);
