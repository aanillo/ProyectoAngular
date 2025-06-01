import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  @Input() activeRoute: string = '';
  darkMode: boolean = false;
  isMenuVisible: boolean = false;
  settingsOpen = false;
  popoverEvent: any;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    document.body.classList.toggle('light', !this.darkMode);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

   openSettings(ev: Event) {
    this.settingsOpen = true;
    this.popoverEvent = ev;
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
