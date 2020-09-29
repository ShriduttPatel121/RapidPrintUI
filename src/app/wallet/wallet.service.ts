import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment";
@Injectable()
export class WalletService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  //http://34.226.216.44
  getWalletBalance() {
    return this.httpClient.get(environment.printApi+"/api/wallet/balance");
  }
  addWalletBalance(amount: number) {
    this.httpClient
      .get(environment.printApi+"/api/wallet/add-balance/" + amount)
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
