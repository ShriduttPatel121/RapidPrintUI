import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-offer",
  templateUrl: "./offer.component.html",
  styleUrls: ["./offer.component.css"],
})
export class OfferComponent implements OnInit {
  @Output() applyCodeEvent = new EventEmitter<string>();
  @Input() offer;
  constructor() {}

  ngOnInit() {}
  applyCode(offerApplied: string) {
    this.applyCodeEvent.emit(offerApplied);
  }
}
