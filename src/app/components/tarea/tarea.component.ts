import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../models/tarea.model';
import { Proyecto } from '../../models/proyecto.model';
import { Estado } from '../../models/estado.model';
import { Usuario } from '../../models/usuario.model';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  proyectoId: string = '';
  proyecto: Proyecto | null = null;
  estados: Estado[] = [
    { id: "1", nombre: 'Por hacer' },
    { id: "2", nombre: 'En progreso' },
    { id: "3", nombre: 'Testeo' },
    { id: "4", nombre: 'Terminado' }
  ];
  theme: string = 'light';
  fechaLimite: string = '';
  etiquetas: string = '';
  usuarios: Usuario[] = [];
  estadoSeleccionado: Estado = this.estados[0];
  prioridadSeleccionada: 'alta' | 'media' | 'baja' = 'media'; 
  usuarioSeleccionado: Usuario | null = null;

  constructor(private router: Router, private themeService: ThemeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proyectoId = params['id'];
      this.cargarProyecto();
    });

    this.cargarUsuarios();
  }

  cargarProyecto(): void {
    const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
    this.proyecto = proyectos.find((p: Proyecto) => p.id === this.proyectoId) || null;
  }

  cargarUsuarios(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuariosGuardados = localStorage.getItem('usuarios');
      if (usuariosGuardados) {
        this.usuarios = JSON.parse(usuariosGuardados);
      }
    }
  }

  crearTarea(titulo: string, descripcion: string, estado: Estado, fechaLimite: string, prioridad: 'alta' | 'media' | 'baja', etiquetas: string[], usuarioAsignado?: Usuario | null): void {
    if (!this.proyecto) {
      console.error('El proyecto no existe');
      return;
    }

    const nuevaTarea: Tarea = {
      id: this.generarId(),
      titulo,
      descripcion,
      estado: estado,
      fechaLimite: new Date(fechaLimite),
      prioridad,
      etiquetas,
      usuarioAsignado: usuarioAsignado ?? undefined,
      tiempoDedicado: '',
      proyectoId: this.proyectoId
    };

    // Agregar tarea al proyecto
    if (!this.proyecto.tareasPorEstado[estado.nombre]) {
      this.proyecto.tareasPorEstado[estado.nombre] = [];
    }
    this.proyecto.tareasPorEstado[estado.nombre].push(nuevaTarea);

    // Guardar el proyecto actualizado
    this.guardarProyecto();
    this.router.navigate([`/tablero/${this.proyectoId}`]);
  }

  generarId(): string {
    let lastId = localStorage.getItem('lastTareaId');
    if (!lastId) {
      lastId = '0';
    }
    const newId = (parseInt(lastId) + 1).toString();
    localStorage.setItem('lastTareaId', newId);
    return newId;
  }

  guardarProyecto(): void {
    const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
    const index = proyectos.findIndex((p: Proyecto) => p.id === this.proyectoId);
    if (index !== -1 && this.proyecto) {
      proyectos[index] = this.proyecto;
      localStorage.setItem('proyectos', JSON.stringify(proyectos));
    }
  }

  volverALaPaginaPrincipal(): void {
    this.router.navigate(['/']);
  }

  cambiarEstadoTarea(tarea: Tarea, nuevoEstado: Estado): void {
    if (nuevoEstado.nombre === 'Terminado') {
      const tiempoDedicado = prompt('Ingrese el tiempo dedicado en horas y minutos (ej. 2:30)');
      if (tiempoDedicado) {
        tarea.tiempoDedicado = tiempoDedicado;
      }
    }
    tarea.estado = nuevoEstado;
    this.guardarProyecto();
  }

  eliminarTarea(tareaId: string): void {
    if (this.proyecto) {
      
      for (const estado in this.proyecto.tareasPorEstado) {
        if (this.proyecto.tareasPorEstado[estado]) {
          this.proyecto.tareasPorEstado[estado] = this.proyecto.tareasPorEstado[estado].filter(t => t.id !== tareaId);
        }
      }
      this.guardarProyecto();
    }
    
  }
}
