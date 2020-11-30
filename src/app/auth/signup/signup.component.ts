import { Component, OnInit } from "@angular/core";
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { UserService } from 'src/app/main/user/user.service';
import { AddDetailsComponent } from './add-details/add-details.component';

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
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  hide: boolean = true;
  hide_confirm: boolean = true;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPasswordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public AddDetailsdialog: MatDialog
  ) {}
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((value) => {
        console.log("sign Up successful..");
        console.log(value);
        this.userService.setSignupType("GMAIL");
        this.userService.setSignupToken(value.idToken);
        // this.router.navigate(["/add-details"]);
        this.AddDetailsdialog.open(AddDetailsComponent,{panelClass: "popup"}).addPanelClass("popup");
      })
      .catch((error) => {
        console.log("sign Up unsuccessful..");
        console.log(error);
      });
  }
  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {}
  signInWithEmail() {
    if (!this.isValid()) {
      return;
    }
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    let confirmPassword = this.confirmPasswordFormControl.value;
    if (password != confirmPassword) {
      return;
    }
    this.userService.setEmail(email);
    this.userService.setPassword(password);
    this.userService.setSignupType("EMAIL");
    this.clear();
    // this.router.navigate(["/add-details"]);
    this.AddDetailsdialog.open(AddDetailsComponent,{height:"400px",width:"800px"});

  }
  isValid() {
    return this.emailFormControl.valid && this.passwordFormControl.valid;
  }
  clear() {
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }
}
