import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Order } from './order.model';
import { OrdersService } from './orders.service';
import { SingleOrderComponent } from './single-order/single-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Order[]=[];
  constructor(private ordersService:OrdersService, public dialog: MatDialog) { }

  ngOnInit() {
this.ordersService.fetchOrders(2).subscribe((response:{error:boolean,data:{meta:any,orders:Order[]}})=>{
  let orders:Order[]=[...response.data.orders];
  var options = { year: 'numeric', month: 'long', day: 'numeric',hour:'2-digit',minute:'2-digit' };
  orders.map(order=>{
    order.createdAt=new Date(order.createdAt).toLocaleDateString("en-US", options);
    return {...order};
  })
  console.log(orders);
  this.orders=[...orders];
  });
}


}
