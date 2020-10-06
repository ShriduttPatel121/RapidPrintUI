import { WalletService } from "./wallet.service";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.css"],
})
export class WalletComponent implements OnInit {
  amount: string = "";
  currBalance: string = "";
  constructor(
    public dialogRef: MatDialogRef<WalletComponent>,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.walletService
      .getWalletBalance()
      .subscribe(
        (curBalanceObject: {
          error: boolean;
          data: { id: string; amount: string };
        }) => {
          this.currBalance = curBalanceObject.data.amount;
        }
      );
  }
  validateInput(event: any) {
    console.log(event.key);
    console.log(event);
    const pattern = /(\d|\.)/;
    if (pattern.test(event.key)) {
      if (event.key === "." && this.amount.split(".").length === 2) {
        event.preventDefault();
        return;
      }
    } else {
      event.preventDefault();
    }
  }
  addAmount() {
    let curAmount = +this.amount;
    if (curAmount > 0) {
      this.walletService.addWalletBalance(curAmount);
    }
  }
}
