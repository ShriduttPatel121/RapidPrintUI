import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPrintComponent } from "./print/add-print/add-print.component";
import { VendorListComponent } from "./vendor/vendor-list/vendor-list.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AddDetailsComponent } from "./user/add-details/add-details.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { ExistingUserGuard } from "./existingUser.guard";

const routes: Routes = [
  {
    path: "vendor-list",
    component: VendorListComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
