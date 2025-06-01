import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from "../calendar/calendar.component";
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, CalendarComponent, FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  selectedPeople: number = 2;
  peopleOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedTime: string = '';
  timeOptions: string[] = [];
  selectedZone: string = '';
  zoneOptions: string[] = ['Planta 1', 'Planta 2'];
  email: string = '';
  selectedDate: string = ''; 

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.generateTimeSlots();
    console.log('Reservas actuales:', this.bookService.getBookings());
  }

  generateTimeSlots() {
    const interval = 15;
    this.timeOptions = [];
    this.addTimeRange(13, 16, interval);
    this.addTimeRange(20, 23, interval);
  }

  private addTimeRange(startHour: number, endHour: number, interval: number) {
    for (let hour = startHour; hour <= endHour; hour++) {
      let limit = (hour === endHour) ? 0 : 59;
      for (let minute = 0; minute <= limit; minute += interval) {
        if (minute === 0 && (hour === 16 || hour === 23)) {
          const formattedHour = hour.toString().padStart(2, '0');
          const formattedMinute = minute.toString().padStart(2, '0');
          this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
          break;
        }
        if ([0, 15, 30, 45].includes(minute)) {
          const formattedHour = hour.toString().padStart(2, '0');
          const formattedMinute = minute.toString().padStart(2, '0');
          this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
      }
    }
  }

  onDateSelected(date: any) {
    if (date) {
      this.selectedDate = date?.toString() || '';
      console.log('Fecha seleccionada:', this.selectedDate);
    }

    this.generateTimeSlots();
    this.filterUnavailableTimes();
  }

  filterUnavailableTimes() {
    const bookings = this.bookService.getBookings();
    this.timeOptions = this.timeOptions.filter(time => 
      bookings.every(booking => !(booking.date === this.selectedDate && booking.time === time))
    );
  }

  isTimeUnavailable(time: string): boolean {
    const bookings = this.bookService.getBookings();
    return bookings.some(booking => booking.date === this.selectedDate && booking.time === time);
  }

  confirmarReserva() {
    console.log('selectedPeople:', this.selectedPeople);
    console.log('selectedTime:', this.selectedTime);
    console.log('selectedZone:', this.selectedZone);
    console.log('email:', this.email);
    console.log('selectedDate:', this.selectedDate);
   
    if (this.selectedPeople && this.selectedTime && this.selectedZone && this.email && this.selectedDate) {
      const newBooking = {
        date: this.selectedDate,
        people: this.selectedPeople,
        time: this.selectedTime,
        zone: this.selectedZone,
        email: this.email
      };
  
      this.bookService.addBooking(newBooking);
  
      this.router.navigate(['/confirm'], {
        state: newBooking
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  goToInicio() {
    this.router.navigate(['/']);
  }
  
}