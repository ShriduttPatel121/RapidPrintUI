
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ApplyOfferComponent } from "../apply-offer/apply-offer.component";
import { PaymentService } from "../payment.service";
import { Payment } from "../payment.model";
import { WalletService } from '../../wallet/wallet.service';
import { Order } from '../../print/order.model';

@Component({
  selector: "app-confirm-payment",
  templateUrl: "./confirm-payment.component.html",
  styleUrls: ["./confirm-payment.component.css"],
})
export class ConfirmPaymentComponent implements OnInit {
  private order: Order = new Order();
  currentWalletBalance: number = 0.0;
  paymentData: Payment;
  constructor(
    public dialog: MatDialog,
    public paymentService: PaymentService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.paymentService
      .getPaymentDataChangedSubject()
      .subscribe((paymentData) => {
        this.paymentData = Object.assign({}, paymentData);
      });
    this.walletService
      .getWalletBalance()
      .subscribe(
        (curBalanceObject: {
          error: boolean;
          data: { id: string; amount: string };
        }) => {
          this.currentWalletBalance = +curBalanceObject.data.amount;
        }
      );
    this.paymentService.confirmPayment();
  }
  applyOffer() {
    this.dialog.open(ApplyOfferComponent, { width: "600px", height : "635px" });
  }
  placeOrder() {
    this.paymentService.placeOrder();
  }
  onWalletAppliedChange() {
    this.paymentService.confirmPayment();
  }
}
