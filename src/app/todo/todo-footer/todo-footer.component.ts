import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as FilterActions from 'src/app/filter/filter.actions';
import * as TodoActions from 'src/app/todo/todo.actions';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [
  ]
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;
  filtrosValidos: FilterActions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: FilterActions.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }

  cambiarFiltro(nuevoFiltro: FilterActions.filtrosValidos): void {
    const accion = FilterActions.SET_FILTRO({filtro: nuevoFiltro});
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]): void {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  borrarTodo(): void {
    this.store.dispatch(TodoActions.BORRAR_ALL_TODO());
  }

}
