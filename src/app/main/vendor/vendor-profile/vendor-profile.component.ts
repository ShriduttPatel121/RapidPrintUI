import { Component, OnInit, Input } from "@angular/core";
import { Vendor } from "../vendor.model";
import { VendorService } from "../vendor.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-vendor-profile",
  templateUrl: "./vendor-profile.component.html",
  styleUrls: ["./vendor-profile.component.css"],
})
export class VendorProfileComponent implements OnInit { 
  @Input()
  vendor: Vendor;
  constructor(private vendorService: VendorService, private router: Router) {}
  ngOnInit() {}
  selectShop() {
    console.log("select shop........");
    console.log(this.vendor);
    let shopSelected = this.vendorService.selectShop(this.vendor);
    if (shopSelected) {
      shopSelected.subscribe((response) => {
        console.log(response);
        this.router.navigate(["/confirm-payment"]);
      });
    }
  }
}
