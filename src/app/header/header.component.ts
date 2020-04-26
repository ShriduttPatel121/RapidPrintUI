import { AuthenticationService } from "./../auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated: boolean = false;
  constructor(private authenticationService: AuthenticationService) {
    this.userIsAuthenticated = this.authenticationService.getAuthStatus();
    this.authenticationService.getAuthStatusSub().subscribe((status) => {
      console.log(status);
      this.userIsAuthenticated = status;
    });
  }

  ngOnInit() {}
  onLogout() {
    this.authenticationService.logout();
  }
}
