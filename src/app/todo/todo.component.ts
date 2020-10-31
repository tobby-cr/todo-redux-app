import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as TodoActions from './todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  completado = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleAll(): void {
    this.completado = !this.completado;

    const accion = TodoActions.TOGGLE_ALL_TODO({completado: this.completado});
    this.store.dispatch(accion);
  }

}
