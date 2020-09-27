import { Subject } from "rxjs";
import { Payment } from "./payment.model";
import { Injectable } from "@angular/core";
import { Print } from "../print/print.model";
import { HttpClient } from "@angular/common/http";
import { LocalStoreService } from "../print/localStore.service";
import { Router } from "@angular/router";

@Injectable()
export class PaymentService {
  paymentData: Payment = null;
  paymentDataChanged: Subject<Payment> = new Subject();
  appliedOfferCode: string = " ";
  appliedOfferCodeChanged: Subject<string> = new Subject();
  walletApplied: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStoreService: LocalStoreService
  ) {}
  //http://100.25.130.76:9090/get-offers
  getAllOffers() {
    return this.httpClient.get("http://100.25.130.76:9090/get-offers");
  }
  getWalletApplied() {
    return this.walletApplied;
  }
  confirmPayment() {
    console.log("Wallet Applied-:" + this.walletApplied);
    let orderId = this.localStoreService.getOrderId();
    this.httpClient
      .get(
        "http://100.25.130.76:9090/confirm-payment/" +
          orderId +
          "?offerCode=" +
          this.appliedOfferCode +
          "&walletApplied=" +
          this.walletApplied
      )
      .subscribe((paymentData: Payment) => {
        console.log("Payment data...");
        console.log(paymentData);
        this.paymentData = paymentData;
        this.paymentDataChanged.next(paymentData);
      });
  }
  applyOfferCode(offerCode: string) {
    this.appliedOfferCode = offerCode;
    this.appliedOfferCodeChanged.next(this.appliedOfferCode);
    this.confirmPayment();
  }
  getPaymentDataChangedSubject() {
    return this.paymentDataChanged.asObservable();
  }
  getOfferCodeChangedSubject() {
    return this.appliedOfferCodeChanged.asObservable();
  }
  placeOrder() {
    let orderId = this.localStoreService.getOrderId();
    this.httpClient
      .get(
        "http://34.226.216.44/api/checkout/" +
          orderId +
          "?offerCode=" +
          this.appliedOfferCode +
          "&walletApplied=" +
          this.walletApplied
      )
      .subscribe(
        (redirectObject: { error: boolean; data: { payment_url: string } }) => {
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
