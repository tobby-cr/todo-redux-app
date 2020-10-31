import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todo/model/todo.model';
import * as fromTodo from './todo/todo.reducer';
import * as fromFilter from './filter/filter.reducer';
import * as fromFilterActions from './filter/filter.actions';

export interface AppState {
  todos: Todo[];
  filtro: fromFilterActions.filtrosValidos;
}

// ACR. Creado para que contenga todos los reducer y no tener que llamarlos de a uno en el app.module en el StoreModule.forRoot.
export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodo.todoReducer,
  filtro: fromFilter.filtroReducer
};
