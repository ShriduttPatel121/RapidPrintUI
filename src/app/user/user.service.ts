import { AuthenticationService } from "./../auth/auth.service";
import { User } from "./user.model";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  private signupType: string;
  private user: User = new User();
  constructor(private authenticationService: AuthenticationService) {}
  setPassword(password: string) {
    this.user.password = password;
  }
  setProfile(profile: File) {
    this.user.profile = profile;
  }
  setEmail(email: string) {
    this.user.email = email;
  }
  setSignupType(type: string) {
    this.signupType = type;
  }
  setSignupToken(token: string) {
    this.user.idtoken = token;
  }
  setGender(gender: string) {
    this.user.gender = gender;
  }
  setDob(date: string) {
    this.user.dob = date;
  }
  setMob(mobile: string) {
    this.user.mobile = mobile;
  }
  setName(name: string) {
    this.user.name = name;
  }
  getUser() {
    return this.user;
  }
  signup() {
    if (this.signupType == "GMAIL") {
      this.authenticationService.signupWithGmail(this.user);
    } else if (this.signupType == "EMAIL") {
      this.authenticationService.signupWithEmail(this.user);
    }
  }
}
