import { Action, createReducer, on } from '@ngrx/store';
import * as FilterActions from './filter.actions';

export const estadoInicial: FilterActions.filtrosValidos = 'todos';

const filtrosReducer = createReducer(
  estadoInicial,
  on(FilterActions.SET_FILTRO, (state, {filtro}) => {
    return filtro;
  })
);

export function filtroReducer(state: FilterActions.filtrosValidos, action: Action): FilterActions.filtrosValidos {
  return filtrosReducer(state, action);
}
