import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  google: any;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://pay.google.com/gp/p/js/pay.js";
    s.innerHTML = "console.log('hii');";
    this.elementRef.nativeElement.appendChild(s);
  }
}
