import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { AuthGuard } from './services/auth-guard.service';
import { AboutUsComponent } from './components/about-us/about-us.component';



const routes: Routes = [
  {path:"",component: HomeComponent},
  { path:"booking", component: BookingComponent, canActivate: [AuthGuard] },
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  {path:"about-us",component: AboutUsComponent},
  {path:"**",redirectTo: "" },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
