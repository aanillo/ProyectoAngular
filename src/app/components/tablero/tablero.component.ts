import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto.model';
import { Tarea } from '../../models/tarea.model';
import { Estado } from '../../models/estado.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TableroComponent implements OnInit {
  proyecto: Proyecto | null = null;
  proyectoId: string = '';
  estados: Estado[] = [];
  tareas: Tarea[] = []; // Todas las tareas del proyecto

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proyectoId = params['id'];
      this.cargarProyecto();
    });
  }

  cargarProyecto(): void {
    // Verifica si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
      this.proyecto = proyectos.find((p: Proyecto) => p.id === this.proyectoId) || null;
      if (this.proyecto) {
        this.estados = this.proyecto.estados;
        this.tareas = this.obtenerTodasLasTareas(); 
      }
    }
  }

  obtenerTodasLasTareas(): Tarea[] {
    if (this.proyecto) {
      let tareas: Tarea[] = [];
      this.estados.forEach(estado => {
        tareas = [...tareas, ...this.proyecto!.tareasPorEstado[estado.nombre]];
      });
      return tareas;
    }
    return [];
  }

  cambiarEstadoTarea(tarea: Tarea, nuevoEstado: Estado): void {
    if (this.proyecto) {
      const estadoActual = this.proyecto.tareasPorEstado[tarea.estado.nombre];
      const index = estadoActual.findIndex(t => t.id === tarea.id);
      if (index !== -1) {
        estadoActual.splice(index, 1);
      }
      tarea.estado = nuevoEstado;
      this.proyecto.tareasPorEstado[nuevoEstado.nombre].push(tarea);
      this.guardarProyecto();
    }
  }

  eliminarTarea(tareaId: string): void {
    if (this.proyecto) {
      for (const estado of this.estados) {
        this.proyecto!.tareasPorEstado[estado.nombre] = this.proyecto!.tareasPorEstado[estado.nombre].filter(t => t.id !== tareaId);
      }
      this.guardarProyecto();
    }
  }

  guardarProyecto(): void {
    // Verifica si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
      const index = proyectos.findIndex((p: Proyecto) => p.id === this.proyectoId);
      if (index !== -1 && this.proyecto) {
        proyectos[index] = this.proyecto;
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
      }
    }
  }

  volverAProyectos(): void {
    this.router.navigate(['/proyecto']);
  }

  crearTarea(proyectoId: string): void {
    this.router.navigate([`/tarea/${proyectoId}`]);
  }
}
