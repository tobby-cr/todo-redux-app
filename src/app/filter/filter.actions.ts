import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const SET_FILTRO = createAction('[Filter] Set Filtro', props<{filtro: filtrosValidos}>());
