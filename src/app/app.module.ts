import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// NgRx
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todo/todo.reducer';
import { filtroReducer } from './filter/filter.reducer';
import * as fromReducers from './app.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { TodoComponent } from './todo/todo.component';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TodoComponent,
    TodosListComponent,
    TodoFooterComponent,
    TodoAddComponent,
    TodoItemComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // StoreModule.forRoot({ todos: todoReducer, filtro: filtroReducer }),
    // ACR. El de arriba es cambiado para no tener que definirlos todos y usar el reducers: ActionReducerMap<AppState> del app.reducers
    StoreModule.forRoot(fromReducers.reducers), // ACR. Se acostumbre usarlo con fromReducers por si existan mas que se llamen reducers.
    // ACR. Esto es para la extension del chrome Redux Devtools Extension
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      // ACR. maxAge Lo que dice es que maneje hasta 25 estados, osea mantenga siempre las ultimas 25 acciones
      // desde que inicia la aplicacion
      maxAge: 25, // Retains last 25 states.
      // ACR. logOnly es para que cuando se encuentre en produccion la aplicacion se puedea impedir que los usuarios
      // que tengan esta extension de Redux Devtools instalada puedan manipular los estados manualmente.
      logOnly: environment.production // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
