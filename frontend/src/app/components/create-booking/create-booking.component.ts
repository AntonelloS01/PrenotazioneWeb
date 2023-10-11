import { Component, OnInit, ViewChild, Output,EventEmitter, } from '@angular/core';
import { FormControl, FormGroup, Validators,NgForm } from "@angular/forms";

import { first } from "rxjs/operators";
import { Booking } from "src/app/models/Booking";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @ViewChild("formDirective")
  formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    return d >= today && d <= oneWeekLater;
  };

  ngOnInit(): void {
    this.form = this.createFormGroup();

    
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      number: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(15)]),
      time: new FormControl('', [Validators.required]),
    });
  }

 
  toggleForm() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.form.reset();
      this.formDirective.resetForm();
     
    }
  }
 
  onSubmit(formData: Pick<Booking, "date" |"number"|"time">): void {
    const selectedDate = formData.date;
  
    const formattedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
  
    // Crea un oggetto con la data formattata
    const formattedFormData: Pick<Booking, "date" |"number"|"time"> = {
      date: formattedDate,
      number: formData.number,
      time: formData.time
    };
  
   
    formData = formattedFormData;
    this.postService
      .createBooking(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
  
        console.log('passa');
      

        this.toggleForm() ;
        this.form.reset();
        this.formDirective.resetForm();
      });
  }
  
}
