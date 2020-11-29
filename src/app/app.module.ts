import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatRadioModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatExpansionModule, MatSlideToggleModule, MatListModule, MatSliderModule, MatInputModule, MatSelectModule, MatDialogModule, MatProgressBarModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatMenuModule, MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { Ng5SliderModule } from 'ng5-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ExistingUserGuard } from './auth/existingUser.guard';
import { HeaderComponent } from './main/header/header.component';
import { OrderComponent } from './main/orders/order/order.component';
import { OrdersComponent } from './main/orders/orders.component';
import { OrdersService } from './main/orders/orders.service';
import { SingleOrderComponent } from './main/orders/single-order/single-order.component';
import { ApplyOfferComponent } from './main/payment/apply-offer/apply-offer.component';
import { OfferComponent } from './main/payment/apply-offer/offer/offer.component';
import { CheckoutComponent } from './main/payment/checkout/checkout.component';
import { ConfirmPaymentComponent } from './main/payment/confirm-payment/confirm-payment.component';
import { PaymentService } from './main/payment/payment.service';
import { AddPrintComponent } from './main/print/add-print/add-print.component';
import { DragAndDropDirective } from './main/print/add-print/drag-and-drop.directive';
import { GoogleDriveSelectorService } from './main/print/GoogleDriveSelectorService';
import { LocalStoreService } from './main/print/localStore.service';
import { PreviewPrintComponent } from './main/print/preview-print/preview-print.component';
import { PrintService } from './main/print/print.service';
import { ProfileComponent } from './main/profile/profile.component';
import { UserService } from './main/user/user.service';
import { VendorListComponent } from './main/vendor/vendor-list/vendor-list.component';
import { VendorProfileComponent } from './main/vendor/vendor-profile/vendor-profile.component';
import { VendorService } from './main/vendor/vendor.service';
import { WalletComponent } from './main/wallet/wallet.component';
import { WalletService } from './main/wallet/wallet.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { EditPrintComponent } from './main/print/edit-print/edit-print.component';
import {MatChipsModule} from '@angular/material/chips';
import { AddDetailsComponent } from './auth/signup/add-details/add-details.component';
import { AddDetailsComponentRef } from './main/user/add-details/add-details.component';


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
    AddDetailsComponentRef,
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
    SingleOrderComponent,
    MainComponent,
    AuthComponent,
    EditPrintComponent,
    AddDetailsComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
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
    MatPaginatorModule,

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
    OrdersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PreviewPrintComponent,
    ForgotPasswordComponent,
    ApplyOfferComponent,
    WalletComponent,
    EditPrintComponent,
    AddDetailsComponent
  ],
})
export class AppModule {}
