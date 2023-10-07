import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { BookingComponent } from './component/booking/booking.component';


const routes: Routes = [

  {path:"",component: HomeComponent},
  { path:"booking", component: BookingComponent},
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  {path:"**",redirectTo: "" },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
