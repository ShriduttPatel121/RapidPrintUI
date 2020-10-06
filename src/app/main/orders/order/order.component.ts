import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order:Order;
  constructor(private router:Router,private route:ActivatedRoute) { 
   
  }

  ngOnInit() {
  
  }

  viewDetails()
  {
    this.router.navigate([this.order.order_id],{relativeTo:this.route});
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
}
