import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
      this.router.navigate(["signup"]);
    }
    return this.authService.isUserLoggedIn$;
  }
}
