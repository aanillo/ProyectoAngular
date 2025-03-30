import { Routes } from '@angular/router';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'proyecto', component: ProyectoComponent},
    {path: 'tarea', component: TareaComponent}
];
