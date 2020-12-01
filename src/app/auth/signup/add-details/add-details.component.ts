import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddDetailsComponent>,) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
