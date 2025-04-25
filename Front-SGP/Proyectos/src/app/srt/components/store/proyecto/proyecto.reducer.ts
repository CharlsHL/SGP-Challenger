import { createReducer, on } from '@ngrx/store';
import * as ProyectoActions from './proyecto.actions';
import { Proyecto } from 'src/app/srt/modelos/proyecto';

export interface ProyectoState {
  proyectos: Proyecto[];
  loading: boolean;
  error: any;
}

export const initialState: ProyectoState = {
  proyectos: [],
  loading: false,
  error: null,
};

export const proyectoReducer = createReducer(
  initialState,

  // Cargar proyectos
  on(ProyectoActions.cargarProyectos, state => ({ ...state, loading: true })),
  on(ProyectoActions.cargarProyectosSuccess, (state, { proyectos }) => ({
    ...state,
    loading: false,
    proyectos,
  })),
  on(ProyectoActions.cargarProyectosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Agregar
  on(ProyectoActions.agregarProyectoSuccess, (state, { proyecto }) => ({
    ...state,
    proyectos: [...state.proyectos, proyecto],
  })),

  // Actualizar
  on(ProyectoActions.actualizarProyectoSuccess, (state, { proyecto }) => ({
    ...state,
    proyectos: state.proyectos.map(p => p.id === proyecto.id ? proyecto : p),
  })),

  // Eliminar
  on(ProyectoActions.eliminarProyectoSuccess, (state, { id }) => ({
    ...state,
    proyectos: state.proyectos.filter(p => p.id !== id),
  }))
);
