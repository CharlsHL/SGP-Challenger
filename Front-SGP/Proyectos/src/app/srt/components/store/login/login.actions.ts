import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Login] Login Request',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);