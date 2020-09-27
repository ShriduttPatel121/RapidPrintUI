import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../user/user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { MatDialogRef } from "@angular/material";

@Injectable()
export class AuthenticationService {
  authToken: string = "";
  isAuthenticated: boolean = false;
  private timer: any;
  expiresIn: number;
  authStatusSub = new Subject<boolean>();
  private userChangedSub: Subject<User> = new Subject<User>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  getUserChangedSub() {
    return this.userChangedSub.asObservable();
  }
  getUserDetails() {
    return this.httpClient.get("http://34.226.216.44/api/auth/user");
  }
  updateUserdatawithoutProfile(user: User) {
    let postData = new FormData();
    postData.append("mobile", user.mobile);
    // postData.append("profile", null);
    postData.append("name", user.name);
    this.httpClient
      .post("http://34.226.216.44/api/updateuser", postData)
      .subscribe(
        (val: { error: boolean; data: any }) => {
          console.log(val);
          if (val.error) {
            return;
          }
          this.userChangedSub.next(val.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  updateUserdatawithProfile(user: User) {
    let postData = new FormData();
    postData.append("mobile", user.mobile);
    postData.append("profile", user.profile);
    postData.append("name", user.name);
    this.httpClient
      .post("http://34.226.216.44/api/updateuser", postData)
      .subscribe(
        (val: { error: boolean; data: any }) => {
          console.log(val);
          if (val.error) {
            return;
          }
          this.userChangedSub.next(val.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  forgotPassword(email: string, mobile: string, dialogref: MatDialogRef<any>) {
    this.httpClient
      .post("http://34.226.216.44/api/auth/forgotpassword", {
        email: email,
        mobile: mobile,
      })
      .subscribe(
        (val) => {
          console.log(val);
          if (val["error"]) {
            return;
          }
          console.log("hello....");
          dialogref.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getAuthStatusSub() {
    return this.authStatusSub.asObservable();
  }
  getAuthStatus() {
    return this.isAuthenticated;
  }
  getAuthtoken() {
    return this.authToken;
  }
  signupWithGmail(user: User) {
    let postData: FormData = new FormData();
    postData.append("idtoken", user.idtoken);
    postData.append("name", user.name);
    postData.append("mobile", user.mobile);
    postData.append("dob", user.dob);
    postData.append("gender", user.gender);
    postData.append("profile", user.profile);
    this.httpClient
      .post("http://34.226.216.44/api/auth/signup/google", postData)
      .subscribe(
        (response: { error: string; data: any }) => {
          console.log(response);
          if (response["error"]) {
            console.log(response["error"]);
            return;
          }
          this.authToken = response.data.token;
          this.expiresIn = response.data["expire_at"] * 1000;

          if (this.authToken && this.expiresIn) {
            let cur = Date.now();
            if (cur < this.expiresIn) {
              this.setTimer(this.expiresIn - cur);
              this.isAuthenticated = true;
              this.authStatusSub.next(true);
              this.setLocalInfo(this.authToken, this.expiresIn.toString());
              this.router.navigate([""]);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  signupWithEmail(user: User) {
    let postData: FormData = new FormData();
    postData.append("name", user.name);
    postData.append("email", user.email);
    postData.append("password", user.password);
    postData.append("mobile", user.mobile);
    postData.append("dob", user.dob);
    postData.append("gender", user.gender);
    postData.append("profile", user.profile);
    this.httpClient
      .post("http://34.226.216.44/api/auth/signup", postData)
      .subscribe(
        (response: { error: string; data: any }) => {
          console.log(response);
          if (response["error"]) {
            console.log(response["error"]);
            return;
          }
          this.authToken = response.data.token;
          this.expiresIn = response.data["expire_at"] * 1000;

          if (this.authToken && this.expiresIn) {
            let cur = Date.now();
            if (cur < this.expiresIn) {
              this.setTimer(this.expiresIn - cur);
              this.isAuthenticated = true;
              this.authStatusSub.next(true);
              this.setLocalInfo(this.authToken, this.expiresIn.toString());
              this.router.navigate([""]);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loginWithGmail(token: string) {
    this.httpClient
      .post("http://34.226.216.44/api/auth/login/google", { idtoken: token })
      .subscribe(
        (response: { error: string; data: any }) => {
          if (response.error) {
            console.log(response.error);
            return;
          }
          console.log(response);
          this.authToken = response.data["token"];

          this.expiresIn = response.data["expire_at"] * 1000;

          if (this.authToken && this.expiresIn) {
            let cur = Date.now();

            if (cur < this.expiresIn) {
              this.isAuthenticated = true;
              this.authStatusSub.next(true);
              this.setLocalInfo(this.authToken, this.expiresIn.toString());
              console.log((this.expiresIn - cur) / 1000);
              this.setTimer(this.expiresIn - cur);
              this.router.navigate([""]);
            } else {
              this.logout();
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loginWithEmail(email: string, password: string) {
    let userData = { email: email, password: password };
    this.httpClient
      .post("http://34.226.216.44/api/auth/login", userData)
      .subscribe(
        (response: { error: string; data: any }) => {
          if (response.error) {
            console.log(response.error);
            return;
          }
          console.log(response);
          this.authToken = response.data["token"];

          this.expiresIn = response.data["expire_at"] * 1000;

          if (this.authToken && this.expiresIn) {
            let cur = Date.now();

            if (cur < this.expiresIn) {
              console.log((this.expiresIn - cur) / 1000);
              this.setTimer(this.expiresIn - cur);
              this.isAuthenticated = true;
              this.authStatusSub.next(true);
              this.setLocalInfo(this.authToken, this.expiresIn.toString());
              this.router.navigate([""]);
            } else {
              this.logout();
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  logout() {
    console.log("Logout------------------->>>>>>>>>>>>>");
    this.isAuthenticated = false;
    this.authStatusSub.next(false);
    this.authToken = null;
    this.expiresIn = null;
    localStorage.clear();
    clearTimeout(this.timer);
    this.router.navigate(["/login"]);
  }
  checkLogin() {
    let localData = this.getLocalInfo();
    let expiresIn = +localData.expiresIn;
    let authToken = localData.authToken;
    let cur = Date.now();

    if (expiresIn && authToken) {
      if (cur < expiresIn) {
        console.log((expiresIn - cur) / 1000);
        this.authToken = authToken;
        this.expiresIn = expiresIn;
        this.isAuthenticated = true;
        this.authStatusSub.next(true);
        this.setTimer(expiresIn - cur);
      } else {
        this.logout();
      }
    }
  }
  private setTimer(duration: number) {
    this.timer = setTimeout(this.logout.bind(this), duration);
  }
  private setLocalInfo(authToken: string, expiresIn: string) {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("expiresIn", expiresIn);
  }
  private getLocalInfo() {
    return {
      authToken: localStorage.getItem("authToken"),
      expiresIn: localStorage.getItem("expiresIn"),
    };
  }
}
