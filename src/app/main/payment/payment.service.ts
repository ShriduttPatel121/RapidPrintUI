import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from '../print/localStore.service';
import { Payment } from './payment.model';


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
    return this.httpClient.get(environment.offerApi+"/get-offers");
  }
  getWalletApplied() {
    return this.walletApplied;
  }
  confirmPayment() {
    console.log("Wallet Applied-:" + this.walletApplied);
    let orderId = this.localStoreService.getOrderId();
    this.httpClient
      .get(
        environment.offerApi+"/confirm-payment/" +
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
        environment.printApi+"/api/checkout/" +
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
