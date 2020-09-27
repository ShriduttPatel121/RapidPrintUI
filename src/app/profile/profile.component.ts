import { User } from "src/app/user/user.model";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../auth/auth.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  hide: boolean = true;
  hide_confirm: boolean = true;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  MOBILE_PATTERN = /[0-9\+\-\ ]/;
  mobileFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(this.MOBILE_PATTERN),
  ]);
  // passwordFormControl = new FormControl("", [
  //   Validators.required,
  //   Validators.minLength(8),
  // ]);
  // confirmPasswordFormControl = new FormControl("", [
  //   Validators.required,
  //   Validators.minLength(8),
  // ]);
  nameFormControl = new FormControl("", [Validators.required]);
  imageUrl: string;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService
      .getUserDetails()
      .subscribe((val: { error: boolean; data: any }) => {
        if (val.error) {
          return;
        }
        this.user = val.data;
        console.log(this.user);
        this.fillDetails();
      });
    this.authenticationService
      .getUserChangedSub()
      .subscribe((changedUser: User) => {
        this.user = changedUser;
        this.fillDetails();
      });
  }
  fillDetails() {
    this.emailFormControl.setValue(this.user.email);
    this.nameFormControl.setValue(this.user.name);
    this.imageUrl = this.user.profile as string;
    this.mobileFormControl.setValue(this.user.mobile);
  }
  handleUpload(filePath: Event) {
    if ((filePath.target as HTMLInputElement).files.length <= 0) {
      return;
    }
    let image = (filePath.target as HTMLInputElement).files[0];
    this.user.profile = image;
    let ext = (image as File).name
      .substring(image.name.lastIndexOf(".") + 1)
      .toLowerCase();
    if (!(ext === "jpeg" || ext === "jpg" || ext === "png")) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
  updateProfile() {
    if (!this.isValid()) {
      return;
    }
    this.user.name = this.nameFormControl.value;
    this.user.mobile = this.mobileFormControl.value;
    console.log(typeof this.user.profile);
    if (typeof this.user.profile == "string") {
      console.log("json body");
      console.log(this.user);
      this.authenticationService.updateUserdatawithoutProfile(this.user);
    } else {
      console.log("form data");
      console.log(this.user);
      this.authenticationService.updateUserdatawithProfile(this.user);
    }
  }
  isValid() {
    return (
      this.emailFormControl.valid &&
      this.nameFormControl.valid &&
      this.mobileFormControl.valid
    );
  }
  clearProfile() {
    this.authenticationService
      .getUserDetails()
      .subscribe((val: { error: boolean; data: any }) => {
        if (val.error) {
          return;
        }
        this.user = val.data;
        console.log(this.user);
        this.fillDetails();
      });
  }
}
