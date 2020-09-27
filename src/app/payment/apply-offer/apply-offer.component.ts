import { LocalStoreService } from "./../../print/localStore.service";
import { Offer } from "./offer.model";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { PaymentService } from "../payment.service";

@Component({
  selector: "app-apply-offer",
  templateUrl: "./apply-offer.component.html",
  styleUrls: ["./apply-offer.component.css"],
})
export class ApplyOfferComponent implements OnInit {
  @ViewChild("offerCode") offerCode;

  availableOffers: Offer[] = [];
  constructor(
    private dialogRef: MatDialogRef<ApplyOfferComponent>,
    private paymentService: PaymentService,
    private localStoreService: LocalStoreService
  ) {}

  ngOnInit() {
    this.paymentService.getAllOffers().subscribe((offers: Offer[]) => {
      this.availableOffers = [...offers];
      console.log(offers);
    });
  }
  applyCode(offerApplied: string) {
    console.log(offerApplied);
    this.paymentService.applyOfferCode(offerApplied);
    this.dialogRef.close();
  }
  capatlizeInput() {
    this.offerCode.nativeElement.value = this.offerCode.nativeElement.value
      .toUpperCase()
      .trim();
  }
}
