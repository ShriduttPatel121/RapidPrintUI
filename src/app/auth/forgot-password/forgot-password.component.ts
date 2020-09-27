import { AuthenticationService } from "./../auth.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  mobileFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  hide: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (!this.isValid()) {
      return;
    }
    this.authenticationService.forgotPassword(
      this.emailFormControl.value,
      this.mobileFormControl.value,
      this.dialogRef
    );
  }
  isValid() {
    return this.emailFormControl.valid && this.mobileFormControl.valid;
  }
}
