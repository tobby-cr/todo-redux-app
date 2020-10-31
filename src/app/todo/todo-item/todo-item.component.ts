import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import * as TodoActions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);


    this.chkField.valueChanges.subscribe(
      valor => {
        // console.log(valor);
        const accion = TodoActions.TOGGLE_TODO({id: this.todo.id});
        this.store.dispatch(accion);
      }
    );

  }

  editar(): void {
    this.editando = true;
    setTimeout(() => {
      // this.txtInputFisico.nativeElement.focus();
      this.txtInputFisico.nativeElement.select(); // ACR. Seleccionar todo el texto.
    }, 10);
  }

  terminarEdicion(): void {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    const accion = TodoActions.EDITAR_TODO({id: this.todo.id, texto: this.txtInput.value});
    this.store.dispatch(accion);
  }

  borrarTodo(): void {
    const accion = TodoActions.BORRAR_TODO({id: this.todo.id});
    this.store.dispatch(accion);
  }

}
