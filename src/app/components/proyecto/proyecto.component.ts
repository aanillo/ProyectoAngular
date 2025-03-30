import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto.model';
import { Tarea } from '../../models/tarea.model';
import { Estado } from '../../models/estado.model';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProyectoComponent {
  proyectos: Proyecto[] = [];
  theme: string = 'light';
  fechaFin: string = '';

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

 
  cargarProyectos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const proyectosGuardados = localStorage.getItem('proyectos');
      if (proyectosGuardados) {
        this.proyectos = JSON.parse(proyectosGuardados);
      }
    }
  }

  
  crearProyecto(nombre: string, descripcion: string, colorIdentificativo: string, fechaFin: string): void {
    const nuevoProyecto: Proyecto = {
      id: this.generarId(),
      nombre,
      descripcion,
      colorIdentificativo,
      fechaFin,
      usuariosAsignados: [],
      tareasPorEstado: this.tareasPorEstado(),
      estados: this.crearEstados()
    };
    this.proyectos.push(nuevoProyecto);
    this.guardarProyectos();
  }

  // Cambiar el tema (oscuro/claro)
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.theme = this.theme === 'light' ? 'dark' : 'light'; 
  }

  volverALaPaginaPrincipal(): void {
    this.router.navigate(['/']); 
  }

  
  generarId(): string {
    let lastId = localStorage.getItem('lastId');
    if (!lastId) {
      lastId = '0';
    }
    const newId = (parseInt(lastId) + 1).toString();
    localStorage.setItem('lastId', newId);
    return newId;
  }

  
  guardarProyectos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('proyectos', JSON.stringify(this.proyectos));
    }
  }

  
  crearEstados(): Estado[] {
    const estados: Estado[] = [
      { id: this.generarId(), nombre: 'Por hacer' },
      { id: this.generarId(), nombre: 'En progreso' },
      { id: this.generarId(), nombre: 'Testeo' },
      { id: this.generarId(), nombre: 'Terminado' }
    ];
    return estados;
  }

  
  tareasPorEstado(): { [estadoNombre: string]: Tarea[] } {
    const tareasPorEstado: { [estadoNombre: string]: Tarea[] } = {};
    const estados = this.crearEstados();

    estados.forEach(estado => {
      tareasPorEstado[estado.nombre] = [];
    });

    return tareasPorEstado;
  }

  agregarTareaAEstado(proyectoId: string, estado: string, tarea: Tarea): void {
    const proyecto = this.proyectos.find(p => p.id === proyectoId);
    if (proyecto && proyecto.tareasPorEstado[estado]) {
      proyecto.tareasPorEstado[estado].push(tarea);
      this.guardarProyectos();
    }
  }

 
  eliminarProyecto(id: string): void {
    this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
    this.guardarProyectos();
  }

  
  verTablero(id: string): void {
    this.router.navigate([`/tablero/${id}`]);
  }
}
