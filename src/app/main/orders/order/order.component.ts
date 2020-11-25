import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order.model';
import { SingleOrderComponent } from '../single-order/single-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order:Order;
  constructor(private router:Router,private route:ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit() {

  }
  getPrintData()
  {
    let names:string[]=[];
    let qtys:string[]=[];

    this.order.printdata.data.forEach((print)=>{
      names.push(print.name);
      qtys.push(print.numOfPrint.toString());
    });
    let str="";
    for(let i=0;i<names.length;i++)
    {
      if(i>0)
      {
        str+=", "
      }
        str+=qtys[i]+" x "+names[i]+" ";
    }
    return str;
  }
  getStatus()
  {
    if(this.order.paymentStatus)
    {
      if(this.order.orderStatus)
      {
          return "COMPLETED";
      }
      else{
          return "PLACED";
      }
    }
    else{
         return "INCOMPLETE";
    }
  }

  viewDetails() {
    this.dialog.open(SingleOrderComponent, {height : "800px", width : "800px"});
  }
}
