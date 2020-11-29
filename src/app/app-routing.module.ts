import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ExistingUserGuard } from './auth/existingUser.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './main/orders/orders.component';
import { SingleOrderComponent } from './main/orders/single-order/single-order.component';
import { CheckoutComponent } from './main/payment/checkout/checkout.component';
import { ConfirmPaymentComponent } from './main/payment/confirm-payment/confirm-payment.component';
import { AddPrintComponent } from './main/print/add-print/add-print.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AddDetailsComponentRef } from './main/user/add-details/add-details.component';
import { VendorListComponent } from './main/vendor/vendor-list/vendor-list.component';


const routes: Routes = [
  {
    path:"auth",
    redirectTo:"/auth/login",
    pathMatch: "full"
  },
  {
    path:"auth",
    component:AuthComponent,
    children:[
      {
        path: "signup",
        component: SignupComponent,
        pathMatch: "full",
        canActivate: [ExistingUserGuard],
      },
      {
        path: "login",
        component: LoginComponent,
        pathMatch: "full",
        canActivate: [ExistingUserGuard],
      }
    ]
  },
  {
    path:"",
    component:MainComponent,
    children:[
      {
        path: "vendor-list",
        component: VendorListComponent,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "",
        component: AddPrintComponent,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "add-details",
        component: AddDetailsComponentRef,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "profile",
        component: ProfileComponent,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "confirm-payment",
        component: ConfirmPaymentComponent,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "checkout",
        component: CheckoutComponent,
        pathMatch: "full",
        canActivate: [],
      },
      {
        path: "orders",
        component: OrdersComponent,
        pathMatch:"full",
      },
      {
        path:"orders/:orderId",
        component: SingleOrderComponent
      }
    ]
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
