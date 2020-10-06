import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class OrdersService{
constructor(private httpClient: HttpClient)
{
    
}
fetchOrders(pageIndex:number)
{
    return this.httpClient.get(environment.printApi+"/api/orders?page="+pageIndex);
}
fetchSingleOrder(orderId:number)
{
    return this.httpClient.get(environment.printApi+"/api/orders/"+orderId);
}
}