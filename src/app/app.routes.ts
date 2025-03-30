import { Routes } from '@angular/router';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'proyecto', component: ProyectoComponent},
    { path: 'tablero/:id', component: TableroComponent },
    { path: 'tarea/:id', component: TareaComponent },
];
