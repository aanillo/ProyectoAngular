import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-us',
  imports: [],
  templateUrl: './us.component.html',
  styleUrl: './us.component.css'
})
export class UsComponent {

  constructor(private router: Router) {

  }

  goToInicio() {
    this.router.navigate(['/']);
  }
}
