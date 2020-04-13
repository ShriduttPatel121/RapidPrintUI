import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
import { MatInputModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { PreviewPrintComponent } from "./print/preview-print/preview-print.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    AddPrintComponent,
    HeaderComponent,
    PreviewPrintComponent
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
    MatDialogModule
  ],
  providers: [PrintService],
  bootstrap: [AppComponent],
  entryComponents: [PreviewPrintComponent]
})
export class AppModule {}
