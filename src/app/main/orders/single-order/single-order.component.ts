import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent {

  constructor(private route:ActivatedRoute, private dialogRef: MatDialogRef<SingleOrderComponent>) { }

}
