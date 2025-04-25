import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProyectoState } from './proyecto.reducer';

export const selectProyectoState = createFeatureSelector<ProyectoState>('proyectos');

export const selectProyectos = createSelector(
  selectProyectoState,
  (state: ProyectoState) => state.proyectos
);

export const selectProyectosLoading = createSelector(
  selectProyectoState,
  (state: ProyectoState) => state.loading
);

export const selectProyectosError = createSelector(
  selectProyectoState,
  (state: ProyectoState) => state.error
);
