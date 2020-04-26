import { AuthenticationService } from "./auth.service";
import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    const token = this.authService.getAuthtoken();
    let authRequest = req;
    if (this.authService.getAuthStatus()) {
      authRequest = req.clone({
        headers: req.headers.set("authorization", "Bearer " + token),
      });
    }

    return next.handle(authRequest);
  }
}
