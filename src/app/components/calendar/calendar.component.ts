import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<string>(); 

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth(); 
  monthDays: string[][] = [];
  weekDays: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  selectedDate: Date | null = null;

  monthNames: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  ngOnInit(): void {
    this.generateCalendar();
  }

  changeMonth(delta: number): void {
    this.selectedMonth += delta;

    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    }

    this.generateCalendar();
  }

  changeYear(delta: number): void {
    this.selectedYear += delta;
    this.generateCalendar();
  }

  generateCalendar(): void {
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    const startDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();

    let week: string[] = new Array(startDay).fill('');
    this.monthDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day.toString());
      if (week.length === 7) {
        this.monthDays.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push('');
      }
      this.monthDays.push(week);
    }
  }

  isPastDate(day: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dayNum = parseInt(day, 10);

    if(isNaN(dayNum)) {
      return true;
    }

    const date = new Date(this.selectedYear, this.selectedMonth, dayNum);
    date.setHours(0, 0, 0, 0);

    if(date < today) {
      return true;
    }

    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 1;
  }

  selectDate(day: string) {
    const dayNum = parseInt(day, 10);

    if(isNaN(dayNum)) {
      return;
    }

    const selectedDate = new Date(this.selectedYear, this.selectedMonth, dayNum);
    this.selectedDate = selectedDate; 
  
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    this.dateSelected.emit(formattedDate);   
  }

  toNumber(value: string): number {
    return parseInt(value, 10);
  }
  
}
