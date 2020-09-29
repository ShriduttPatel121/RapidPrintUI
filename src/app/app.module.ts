import { WalletService } from "./wallet/wallet.service";
import { AuthGuard } from "./auth/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddPrintComponent } from "./print/add-print/add-print.component";
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { Ng5SliderModule } from "ng5-slider";
import { PrintService } from "./print/print.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import {
  MatInputModule,
  MatNativeDateModule,
  MatDividerModule,
  MatListModule,
} from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { PreviewPrintComponent } from "./print/preview-print/preview-print.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from "@angular/material/card";
import { VendorListComponent } from "./vendor/vendor-list/vendor-list.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LocalStoreService } from "./print/localStore.service";
import { AddDetailsComponent } from "./user/add-details/add-details.component";
import { UserService } from "./user/user.service";
import { AuthenticationService } from "./auth/auth.service";
import { DatePipe } from "@angular/common";
import { LoginComponent } from "./auth/login/login.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ExistingUserGuard } from "./existingUser.guard";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ProfileComponent } from "./profile/profile.component";
import { VendorProfileComponent } from "./vendor/vendor-profile/vendor-profile.component";
import { VendorService } from "./vendor/vendor.service";
import { MatRadioModule } from "@angular/material/radio";
import { ConfirmPaymentComponent } from "./payment/confirm-payment/confirm-payment.component";
import { ApplyOfferComponent } from "./payment/apply-offer/apply-offer.component";
import { OfferComponent } from "./payment/apply-offer/offer/offer.component";
import { CheckoutComponent } from "./payment/checkout/checkout.component";
import { PaymentService } from "./payment/payment.service";
import { WalletComponent } from "./wallet/wallet.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./orders/order/order.component";
import { GoogleDriveSelectorService } from "./print/GoogleDriveSelectorService";
import { DragAndDropDirective } from "./print/add-print/drag-and-drop.directive";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "739449918369-juivcj9bgg50naruqupe1rag45flgc1r.apps.googleusercontent.com"
      //"969052518787-4utk5ecgrov99qnba8eita60j11o1s6v.apps.googleusercontent.com"
    ),
  },
]);

@NgModule({
  declarations: [
    AppComponent,
    AddPrintComponent,
    HeaderComponent,
    PreviewPrintComponent,
    VendorListComponent,
    SignupComponent,
    AddDetailsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    VendorProfileComponent,
    ConfirmPaymentComponent,
    ApplyOfferComponent,
    OfferComponent,
    CheckoutComponent,
    WalletComponent,
    OrdersComponent,
    OrderComponent,
    DragAndDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    PdfViewerModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
    MatListModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    Ng5SliderModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressBarModule,
    SocialLoginModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [
    PrintService,
    AuthenticationService,
    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: function () {
        return config;
      },
    },
    LocalStoreService,
    VendorService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    ExistingUserGuard,
    PaymentService,
    WalletService,
    GoogleDriveSelectorService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PreviewPrintComponent,
    ForgotPasswordComponent,
    ApplyOfferComponent,
    WalletComponent,
  ],
})
export class AppModule {}
