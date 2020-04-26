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
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule, MatNativeDateModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { PreviewPrintComponent } from "./print/preview-print/preview-print.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
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
import { ExistingUserGuard } from './existingUser.guard';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "969052518787-4utk5ecgrov99qnba8eita60j11o1s6v.apps.googleusercontent.com"
    ),
  },
]);
function provideConfig() {
  return config;
}
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    PdfViewerModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
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
  ],
  providers: [
    PrintService,
    AuthenticationService,
    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    LocalStoreService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    ExistingUserGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [PreviewPrintComponent],
})
export class AppModule {}
