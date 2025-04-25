import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuarioState } from './usuario.reducer';

export const selectUsuariosState = createFeatureSelector<UsuarioState>('usuarios');

export const selectUsuarios = createSelector(
    selectUsuariosState,
  (state: UsuarioState) => state.usuarios
);

export const selectUsuariosLoading = createSelector(
    selectUsuariosState,
  (state: UsuarioState) => state.loading
);

export const selectUsuariosError = createSelector(
    selectUsuariosState,
  (state: UsuarioState) => state.error
);
