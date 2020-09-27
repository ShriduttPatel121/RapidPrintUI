import { LocalStoreService } from "./../print/localStore.service";
import { Vendor } from "./vendor.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//34.226.216.44
@Injectable()
export class VendorService {
  constructor(
    private http: HttpClient,
    private localStoreService: LocalStoreService
  ) {}
  getVendorsRequest(urlPart: string) {
    return this.http.get(
      "http://34.226.216.44:8080/listVendor" + urlPart ///sortBy/location?data=eyJjaXR5IjoiYWhtZWRhYmFkIiwibGF0IjoxMi45NzE2LCJsb25nIjo3Ny41OTQ2fQ==&pageSize=5&pageIndex=0"
    );
  }
  selectShop(vendor: Vendor) {
    let order_id = this.localStoreService.getOrderId();
    if (!order_id) {
      return;
    }
    return this.http.post("http://34.226.216.44:80/api/updatecenter", {
      center_id: vendor.center_id,
      order_id: order_id,
    });
  }
}
