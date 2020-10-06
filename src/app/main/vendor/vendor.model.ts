import { Address } from "./address.model";
import { Price } from "./price.model";
import { Time } from "./time.model";

export class Vendor {
  center_id: string;
  name: string;
  mobile: string;
  address: Address;
  price: Price;
  timings: Time[];
  email: string;
  extraContacts: string[];
  center_status: number;
}
