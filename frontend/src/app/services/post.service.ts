import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { Booking } from "../models/Booking";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
import { MatDialog } from '@angular/material/dialog';
import { BookingStatusDialogComponent } from "../components/booking-status-dialog/booking-status-dialog.component";
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class PostService {
  private url = "http://localhost:3000/booking";

  formattedDate: Date = new Date();

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  fetchAll(): Observable<Booking[]> {
    return this.http
      .get<Booking[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Booking[]>("fetchAll", []))
      );
  }


  getBookingServiceUrl(): string {
    return "http://localhost:3000/booking"; // Sostituisci con l'URL effettivo
  }

  createBooking(
    formData: Partial<Booking>,
    userId: Pick<User, "id">
  ): Observable<Booking> {
    console.log('createBooking started');
    console.log('FormData:', formData);
    console.log('UserID:', userId);
  
    if (formData && formData.date !== undefined) {
      const date = formData.date.toISOString().slice(0, 10);
  
      return this.http
        .post<Booking>(
          this.url,
          { date, number: formData.number, time: formData.time, user: userId },
          this.httpOptions
        )
        .pipe(
          catchError((error) => {
            console.error('Errore nella chiamata API:', error);
            return throwError('Errore durante la creazione della prenotazione');
          }),
          tap(() => { this.showBookingConfirmationModal();
            this.router.navigate(['/home']);
          })
        );
    } else {
      console.error('formData o formData.date è undefined');
    
      return throwError('Errore: formData o formData.date è undefined');
    }
  }
  


  showBookingConfirmationModal() {
    const dialogRef = this.dialog.open(BookingStatusDialogComponent, {
      data: {
        title: 'Conferma prenotazione',
        message: 'Prenotazione effettuata con successo!'
      }
    });
 
  }


  
  deleteBooking(bookingUrl: string): Observable<{}> {
    console.log('Delete method called with URL:', bookingUrl);
    return this.http
      .delete<Booking>(bookingUrl, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Booking>("deleteBooking"))
      );
  }
}
