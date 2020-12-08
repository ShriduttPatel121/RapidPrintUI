import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-vendor-timings',
  templateUrl: './vendor-timings.component.html',
  styleUrls: ['./vendor-timings.component.css']
})
export class VendorTimingsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VendorTimingsComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
