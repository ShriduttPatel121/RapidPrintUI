import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPrintComponent } from "./print/add-print/add-print.component";
import { VendorListComponent } from "./vendor/vendor-list/vendor-list.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AddDetailsComponent } from "./user/add-details/add-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { ExistingUserGuard } from "./existingUser.guard";
import { ProfileComponent } from "./profile/profile.component";
import { ConfirmPaymentComponent } from "./payment/confirm-payment/confirm-payment.component";
import { CheckoutComponent } from "./payment/checkout/checkout.component";
import { OrdersComponent } from "./orders/orders.component";

const routes: Routes = [
  {
    path: "vendor-list",
    component: VendorListComponent,
    pathMatch: "full",
    canActivate: [],
  },
  {
    path: "signup",
    component: SignupComponent,
    pathMatch: "full",
    canActivate: [ExistingUserGuard],
  },
  {
    path: "",
    component: AddPrintComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "add-details",
    component: AddDetailsComponent,
    pathMatch: "full",
    canActivate: [ExistingUserGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [ExistingUserGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "confirm-payment",
    component: ConfirmPaymentComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "orders",
    component: OrdersComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
