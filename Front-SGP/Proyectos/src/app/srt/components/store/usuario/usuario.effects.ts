import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsuarioService } from 'src/app/srt/services/usuario.service';
import * as UsuarioActions from './usuario.actions'; // Asegúrate que este path sea correcto

@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions, private usuarioService: UsuarioService) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.cargarUsuarios),
      mergeMap(() =>
        this.usuarioService.getAll().pipe(
          map(usuarios => UsuarioActions.cargarUsuariosSuccess({ usuarios })),
          catchError(error => of(UsuarioActions.cargarUsuariosFailure({ error })))
        )
      )
    )
  );

  agregarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.agregarUsuario),
      mergeMap(action =>
        this.usuarioService.add(action.usuario).pipe(
          map(usuario => UsuarioActions.agregarUsuarioSuccess({ usuario })),
          catchError(error => of(UsuarioActions.agregarUsuarioFailure({ error })))
        )
      )
    )
  );

  actualizarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.actualizarUsuario),
      mergeMap(action =>
        this.usuarioService.update(action.usuario).pipe(
          map(usuario => UsuarioActions.actualizarUsuarioSuccess({ usuario })),
          catchError(error => of(UsuarioActions.actualizarUsuarioFailure({ error })))
        )
      )
    )
  );

  eliminarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.eliminarUsuario),
      mergeMap(action =>
        this.usuarioService.delete(action.id).pipe(
          map(() => UsuarioActions.eliminarUsuarioSuccess({ id: action.id })),
          catchError(error => of(UsuarioActions.eliminarUsuarioFailure({ error })))
        )
      )
    )
  );
}
