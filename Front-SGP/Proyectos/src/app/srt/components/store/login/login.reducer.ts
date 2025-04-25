import { createReducer, on } from '@ngrx/store';
import { loginRequest,loginSuccess,loginFailure } from './login.actions';

export interface LoginState {
  user: any | null;
  error: string | null;
  loading: boolean;
}

export const initialState: LoginState = {
  user: null,
  error: null,
  loading: false,
};

export const loginReducer = createReducer(
  initialState,
  on(loginRequest, state => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, error, loading: false }))
);