import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { Booking } from "../models/Booking";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private url = "http://localhost:3000/booking";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
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
    return this.http
      .post<Booking>(
        this.url,
        { date: formData.date, number: formData.number, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Booking>("createBooking"))
      );
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
