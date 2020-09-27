import { WalletService } from "./../wallet/wallet.service";
import { User } from "src/app/user/user.model";
import { AuthenticationService } from "./../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { WalletComponent } from "../wallet/wallet.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated: boolean = false;
  walletBalance: string;
  imageUrl: string = "https://www.w3schools.com/howto/img_avatar.png";
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public walletDialog: MatDialog,
    private walletService: WalletService
  ) {
    this.userIsAuthenticated = this.authenticationService.getAuthStatus();
    this.authenticationService.getAuthStatusSub().subscribe((status) => {
      console.log(status);
      this.userIsAuthenticated = status;
      if (this.userIsAuthenticated) {
        this.authenticationService
          .getUserDetails()
          .subscribe((val: { error: boolean; data: any }) => {
            if (val.error) {
              return;
            }
            if (val.data.profile) {
              this.imageUrl = val.data.profile;
            }
          });
      }
    });
    this.authenticationService.getUserChangedSub().subscribe((user: User) => {
      if (user.profile) {
        this.imageUrl = user.profile as string;
      }
    });
    if (this.userIsAuthenticated) {
      this.authenticationService
        .getUserDetails()
        .subscribe((val: { error: boolean; data: any }) => {
          if (val.error) {
            return;
          }
          if (val.data.profile) {
            this.imageUrl = val.data.profile;
          }
        });
    }
  }

  ngOnInit() {
    this.walletService
      .getWalletBalance()
      .subscribe(
        (curBalanceObject: {
          error: boolean;
          data: { id: string; amount: string };
        }) => {
          console.log("wallet balance is...." + curBalanceObject.data.amount);
          this.walletBalance = curBalanceObject.data.amount;
        }
      );
  }
  onLogout() {
    this.authenticationService.logout();
  }
  myProfile() {
    this.router.navigate(["/profile"]);
  }
  openWallet() {
    this.walletDialog.open(WalletComponent, {
      width: "850px",
      height: "500px",
    });
  }
}
