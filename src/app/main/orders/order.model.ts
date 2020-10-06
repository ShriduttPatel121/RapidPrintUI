import { Payment } from '../payment/payment.model';
import { Print } from '../print/print.model';
import { User } from '../user/user.model';
import { Vendor } from '../vendor/vendor.model';

export class Order{
    order_id:string;
    paymentStatus:boolean;
    orderStatus:boolean;
    createdAt:any;
    userdata:User;
    center:Vendor;
    bill:Payment;
    printdata:{data:Print[]};
}