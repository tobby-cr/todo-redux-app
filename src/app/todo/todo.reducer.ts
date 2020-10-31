import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './model/todo.model';
import * as TodoActions from './todo.actions'; // ACR. Para no tener que importarlos de a uno.

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el Mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');
todo2.completado = true;

export const estadoInicial: Todo[] = [todo1, todo2, todo3];

const todosReducer = createReducer(
  estadoInicial,
  on(TodoActions.AGREGAR_TODO, (state, {texto}) => {
    const todo = new Todo(texto);
    // ACR. Nunca usar push(), se debe crear un nuevo arreglo.
    return [...state, todo]; // ACR. Siempre debe regresar un estado. En este caso se clona el state y se agrega un nuevo elemento.
  }),
  on(TodoActions.TOGGLE_TODO, (state, {id}) => {
    // ACR. Siempre debe regresar un estado. No se debe mutar la informacion anterior porque de otro modo no se podrá
    // regresar a estados anteriores. En este caso debe retornar un nuevo estado y siempre debe romper la
    // referencia que tiene javascript con los objetos, por eso se usa el map() que regresa un nuevo arreglo. El
    // map() es como un foreach que recorre todos los elementos.
    return state.map(todoEdit => {
      if (todoEdit.id === id) {
        // todoEdit.completado = true; // ACR. Esto no puede hacerse porque los objetos son pasados por referencia, y
        // por eso se debe retornar un nuevo objeto de tipo todo tal como se muestra a continuacion:
        return {
          ...todoEdit, // Esto clona todas las propiedades para retornarlos. y los que escriba debajo como el completado les
                       // va cambiar el valor.
          completado: !todoEdit.completado
        };
      } else {
        return todoEdit;
      }
    });
  }),
  on(TodoActions.TOGGLE_ALL_TODO, (state, {completado}) => {
    return state.map(todoEdit => {
      return {
        ...todoEdit,
        completado
      };
    });
  }),
  on(TodoActions.EDITAR_TODO, (state, {id, texto}) => {
    return state.map(todoEdit => {
      if (todoEdit.id === id) {
        return {
          ...todoEdit,
          texto // ACR. Como se llama igual, se puede dejar asi y no es necesario decir texto: texto.
        };
      } else {
        return todoEdit;
      }
    });
  }),
  on(TodoActions.BORRAR_TODO, (state, {id}) => {
    return state.filter(todoEdit => todoEdit.id !== id); // ACR. Retorna un nuevo arreglo sin incluir el que tenga el id indicado.
  }),
  on(TodoActions.BORRAR_ALL_TODO, (state) => {
    return state.filter(todoEdit => !todoEdit.completado); // ACR. Retorna un nuevo arreglo sin los completados.
  })
);

export function todoReducer(state: Todo[], action: Action): Todo[] {
  return todosReducer(state, action);
}
