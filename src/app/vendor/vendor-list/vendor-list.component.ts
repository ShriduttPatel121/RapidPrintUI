import { VendorService } from "./../vendor.service";
import { Component, OnInit } from "@angular/core";
import { Vendor } from "../vendor.model";
import csc from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.css"],
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  sortBy = "location";
  sortDirection = "1";
  csc = csc;
  state: IState = csc.getStateById("12");
  city: ICity = csc.getCityById("783");
  lat: number;
  long: number;
  vendorNames: string[];
  filteredVendorNames: Observable<string[]>;
  vendorNameControl = new FormControl();
  constructor(private vendorService: VendorService) {
    navigator.geolocation.getCurrentPosition((coords) => {
      this.lat = coords.coords.latitude;
      this.long = coords.coords.longitude;
      console.log(this.lat + " " + this.long);
    });
  }

  ngOnInit() {
    //this.onChange();
    console.log(csc.getStatesOfCountry("101"));
    console.log(csc.getCitiesOfState("12"));
    this.setVendorNames();
    this.setOrderedVendorList();
    this.filteredVendorNames = this.vendorNameControl.valueChanges.pipe(
      map((value) => this._filter(value))
    );
  }
  setOrderedVendorList() {
    let qry = "/sortBy/" + this.sortBy + "?";
    let data = {
      state: this.state.name,
      city: this.city.name,
      lat: this.lat,
      long: this.long,
    };
    console.log(data);
    console.log(btoa(JSON.stringify(data)));
    let dataBase64 = btoa(JSON.stringify(data));
    qry +=
      "data=" +
      dataBase64 +
      "&" +
      "pageSize=" +
      5 +
      "&" +
      "pageIndex=" +
      0 +
      "&" +
      "direction=" +
      this.sortDirection;
    console.log(qry);

    this.vendorService
      .getVendorsRequest(qry)
      .subscribe((response: { error: Boolean; data: Vendor[] }) => {
        if (response.error) {
          return;
        }
        this.vendors = [...response.data];
        console.log(this.vendors);
      });
  }
  setVendorNames() {
    let data = {
      state: this.state.name,
      city: this.city.name,
      lat: this.lat,
      long: this.long,
    };
    let dataBase64 = btoa(JSON.stringify(data));
    this.vendorNames = [];
    let nameQry = "/vendorNames?" + "data=" + dataBase64;
    console.log("change  " + this.city.name);
    this.vendorService
      .getVendorsRequest(nameQry)
      .subscribe((response: { error: Boolean; data: string[] }) => {
        if (response.error) {
          return;
        }
        this.vendorNames = [...response.data];
        // this.filteredVendorNames = [...response.data];
        console.log(this.vendorNames);
      });
  }
  onStateChange() {
    console.log("state...");
    this.city = csc.getCityById(csc.getCitiesOfState(this.state.id)[0].id);
    this.setOrderedVendorList();
    this.setVendorNames();
  }
  onCityChange() {
    this.setOrderedVendorList();
    this.setVendorNames();
  }
  onSortChange() {
    this.setOrderedVendorList();
  }
  onSearchChange() {
    let data = {
      state: this.state.name,
      city: this.city.name,
      lat: this.lat,
      long: this.long,
    };
    let dataBase64 = btoa(JSON.stringify(data));
    let qry =
      "/byName?data=" +
      dataBase64 +
      "&vendorName=" +
      this.vendorNameControl.value;
    this.vendorService
      .getVendorsRequest(qry)
      .subscribe((response: { error: Boolean; data: any[] }) => {
        this.vendors = [...response.data];
        // console.log("------------------->>>>>>>>>>>>>>>>");
        // console.log(response.data);
      });
  }
  clearSearch() {
    this.vendorNameControl.setValue("");
    this.setOrderedVendorList();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.vendorNames) {
      return this.vendorNames.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
    return [];
  }
}
