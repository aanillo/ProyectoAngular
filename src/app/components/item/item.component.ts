import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../../models/food';
import { FoodService } from '../../service/food.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  imports: [CommonModule]
})
export class ItemComponent implements OnInit {

  foodItem?: Food;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.foodItem = this.foodService.getFoodById(id);
    });
  }

  goToInicio() {
    this.router.navigate(['/']);
  }

  goToCard() {
    this.router.navigate(['/carta']);
  }
}
