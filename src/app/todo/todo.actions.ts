import { createAction, props } from '@ngrx/store';

export const AGREGAR_TODO = createAction('[TODO] Agregar todo', props<{texto: string}>());
export const TOGGLE_TODO = createAction('[TODO] Toggle todo', props<{id: number}>());
export const TOGGLE_ALL_TODO = createAction('[TODO] Toggle all todo', props<{completado: boolean}>());
export const EDITAR_TODO = createAction('[TODO] Editar todo', props<{id: number, texto: string}>());
export const BORRAR_TODO = createAction('[TODO] Borrar todo', props<{id: number}>());
export const BORRAR_ALL_TODO = createAction('[TODO] Borrar all todo'); // ACR. Borra los completados

