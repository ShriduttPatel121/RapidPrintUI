import { AuthenticationService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { Router } from "@angular/router";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}
  isValid() {
    return this.emailFormControl.valid && this.passwordFormControl.valid;
  }
  clear() {
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }
  logInWithEmail() {
    if (!this.isValid()) {
      return;
    }
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    console.log(email + " " + password);
    this.authenticationService.loginWithEmail(email, password);
    this.clear();
  }
  logInWithGoogle() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((value) => {
        console.log("Login successful..");
        console.log(value);
        this.authenticationService.loginWithGmail(value.idToken);
      })
      .catch((error) => {
        console.log("Login unsuccessful..");
        console.log(error);
      });
  }
}
