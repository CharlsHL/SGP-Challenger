import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loginRequest, loginSuccess, loginFailure } from './login.actions';

import { LoginService } from 'src/app/srt/services/login.service';
import { Router } from '@angular/router';
@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router, 
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      mergeMap(action =>
        this.loginService.login(action.username, action.password).pipe(
          map(response => {
            // Suponiendo que response.token es lo que devuelve tu API
            const user = { token: response.token, username: action.username };
            console.log(user);
            localStorage.setItem('userToken', response.token); // Guarda el token
            return loginSuccess({ user });
          }),
          catchError(error =>
            of(loginFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  // Efecto para redirigir después de login exitoso
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => {
        this.router.navigate(['/dashboard']); // Redirige al Dashboard

      })
    ),
    { dispatch: false } 
  );
}
