import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class WalletService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  getWalletBalance() {
    return this.httpClient.get("http://34.226.216.44/api/wallet/balance");
  }
  addWalletBalance(amount: number) {
    this.httpClient
      .get("http://34.226.216.44/api/wallet/add-balance/" + amount)
      .subscribe(
        (redirectObject: { error: boolean; data: { payment_url: string } }) => {
          console.log(redirectObject.data.payment_url);
          let url = redirectObject.data.payment_url;
          console.log(url);
          this.redirectToCheckout(url);
        }
      );
  }
  redirectToCheckout(url: string) {
    window.location.replace(url);
  }
}
