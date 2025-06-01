import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookings: Book[] = [];
  private nextId: number = 1;

  constructor() {}

  addBooking(bookingData: Omit<Book, 'id'>): void {
    const booking: Book = {
      ...bookingData,
      id: this.nextId++
    };

    this.bookings.push(booking);
    console.log('Reserva guardada:', booking);
  }

  getBookings(): Book[] {
    return this.bookings;
  }

  isTimeSlotAvailable(date: string, time: string): boolean {
    return !this.bookings.some(
        (booking) => booking.date === date && booking.time === time
    );
  }

}