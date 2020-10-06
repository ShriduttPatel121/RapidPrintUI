import { Component } from "@angular/core";
import { AuthenticationService } from "./auth/auth.service";
import { LocalStoreService } from './main/print/localStore.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "rapidPrintUI";
  constructor(
    private localStoreService: LocalStoreService,
    private authenticationService: AuthenticationService
  ) {
    //this.localStoreService.validateTtl();
    this.authenticationService.checkLogin();
  }
}
