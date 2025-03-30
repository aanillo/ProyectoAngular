import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: string = 'light';

  constructor() {
    this.cargarTema(); // Cargar el tema guardado al iniciar
  }

  private cargarTema(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const temaGuardado = localStorage.getItem('theme');
      if (temaGuardado) {
        this.theme = temaGuardado;
        this.applyTheme(); // Aplicar el tema al cargar
      }
    }
  }

  private applyTheme(): void {
    const body = document.body;
    if (this.theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  public toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', this.theme);
    }
    this.applyTheme();
  }

  public getTheme(): string {
    return this.theme;
  }
}
