import { Component, OnInit, Input } from '@angular/core';
import { Vendor } from '../vendor.model';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VendorTimingsComponent } from './vendor-timings/vendor-timings.component';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css'],
})
export class VendorProfileComponent implements OnInit {
  @Input()
  vendor: Vendor;
  constructor(private vendorService: VendorService, private router: Router, private showTimingDialog: MatDialog) {}
  ngOnInit() {}
  selectShop() {
    console.log('select shop........');
    console.log(this.vendor);
    let shopSelected = this.vendorService.selectShop(this.vendor);
    if (shopSelected) {
      shopSelected.subscribe((response) => {
        console.log(response);
        this.router.navigate(['/confirm-payment']);
      });
    }
  }

  onShowTimings() {
    this.showTimingDialog.open(VendorTimingsComponent, { width: '400px', height: '453px' }).addPanelClass("timing-popup");
  }
}
