import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {ProyectoService } from 'src/app/srt/services/proyecto.service'
import * as ProyectoActions from './proyecto.actions';
@Injectable()
export class ProyectoEffects {
  constructor(private actions$: Actions, private proyectoService: ProyectoService) {}

  cargarProyectos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProyectoActions.cargarProyectos),
      mergeMap(() =>     
        this.proyectoService.getAll().pipe(
          map(proyectos => ProyectoActions.cargarProyectosSuccess({ proyectos })),
          catchError(error => of(ProyectoActions.cargarProyectosFailure({ error })))
        )
        
      )
    )
    
  );

  agregarProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProyectoActions.agregarProyecto),
      mergeMap(action =>
        this.proyectoService.add(action.proyecto).pipe(
          map(proyecto => ProyectoActions.agregarProyectoSuccess({ proyecto })),
          catchError(error => of(ProyectoActions.agregarProyectoFailure({ error })))
        )
      )
    )
  );

  actualizarProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProyectoActions.actualizarProyecto),
      mergeMap(action =>
        this.proyectoService.update(action.proyecto).pipe(
          map(proyecto => ProyectoActions.actualizarProyectoSuccess({ proyecto })),
          catchError(error => of(ProyectoActions.actualizarProyectoFailure({ error })))
        )
      )
    )
  );

  eliminarProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProyectoActions.eliminarProyecto),
      mergeMap(action =>
        this.proyectoService.delete(action.id).pipe(
          map(() => ProyectoActions.eliminarProyectoSuccess({ id: action.id })),
          catchError(error => of(ProyectoActions.eliminarProyectoFailure({ error })))
        )
      )
    )
  );
}
