import { Print } from "../print/print.model";

export class Payment {
  basePrice: number;
  taxPrice: number;
  totalPrice: number;
  discountedPrice: number;
  offerCodeApplied: string;
  printData: Print[];
  centerName: string;
  centerAddress: { landmark: string; city: string };
  userDetail: { name: string; mobile: string };
  billDetails: any;
}
