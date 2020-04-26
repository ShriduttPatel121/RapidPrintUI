import { Component } from "@angular/core";
import { LocalStoreService } from "./print/localStore.service";
import { AuthenticationService } from "./auth/auth.service";

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
