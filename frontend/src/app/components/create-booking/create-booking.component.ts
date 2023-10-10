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

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      number: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(15)]),
    });
  }

 
  onSubmit(formData: Pick<Booking, "date" | "number">): void {
    this.postService
      .createBooking(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.form.reset();
    this.formDirective.resetForm();
  
    
  }
}
