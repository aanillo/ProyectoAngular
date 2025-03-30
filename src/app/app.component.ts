import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ThemeService } from './services/theme.service'; // Importar el servicio de tema
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NetTask';
  currentRoute: string = '';

  // Inyectar el servicio de tema
  constructor(private router: Router, private themeService: ThemeService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Solo cuando la navegación termina
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;  // Actualiza la ruta
    });
  }

  // Método para alternar el tema
  toggleTheme(): void {
    this.themeService.toggleTheme(); // Usar el servicio para cambiar el tema
  }

  // Métodos para la navegación
  tareas(): void {
    this.router.navigate(['/tarea']);
  }

  proyectos(): void {
    this.router.navigate(['/proyecto']);
  }

  // Getter para acceder al tema actual
  get theme(): string {
    return this.themeService.getTheme();
  }
}
