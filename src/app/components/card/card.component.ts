import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { Router } from '@angular/router'; 
import { FoodService } from '../../service/food.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [CommonModule]
})
export class CardComponent implements OnInit {

  foods: Food[] = [];
  filteredFoods: Food[] = [];
  selectedCategory: string = '';

  constructor(private router: Router, private foodService: FoodService) {}

  ngOnInit(): void {
    this.foods = this.foodService.getAllFoods();
    this.filterByCategory('entrante');
  }

  filterByCategory(category: string) {
    this.selectedCategory = category.toUpperCase();
    this.filteredFoods = this.foodService.getFoodsByCategory(category);
  }

  goToInicio() {
    this.router.navigate(['/']);
  }

  goToItem(id: number) {
    this.router.navigate(['/item', id]);
  }
}
