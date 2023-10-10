import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { Observable } from "rxjs";
import { PostService} from "src/app/services/post.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/User";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  bookings$!: Observable<Booking[]>;
  userId!: Pick<User, "id">;
  logBooking(booking: any) {
    console.log(booking);
  }

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookings$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Booking[]> {
    return this.postService.fetchAll();
  }

  createBooking(): void {
    this.bookings$ = this.fetchAll();
  }

  delete(bookingId: number): void {
    const bookingUrl = `${this.postService.getBookingServiceUrl()}/${bookingId}`;
    console.log('Delete method called with URL:', bookingUrl);
  
    this.postService
      .deleteBooking(bookingUrl)
      .subscribe(() => {
        this.bookings$ = this.fetchAll();
      });
  }
}
