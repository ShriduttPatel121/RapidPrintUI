import { Print } from "./print.model";
import { Injectable } from "@angular/core";

@Injectable()
export class LocalStoreService {
  storage = localStorage;
  constructor() {}
  validateTtl() {
    let ttl = +this.storage.getItem("ttl");
    if (!ttl) {
      this.storage.clear();
      return;
    }
    let cur = new Date().valueOf();
    if (cur > ttl) {
      this.storage.clear();
    }
  }
  getLength() {
    let len = this.storage.getItem("length");
    if (!len) {
      this.storage.setItem("length", "0");
    }
    return +this.storage.getItem("length");
  }
  storeLength(len: number) {
    this.storage.setItem("length", len.toString());
  }
  updatePrint(index: number, print: Print) {
    let len = this.getLength();
    if (index >= len || index < 0) {
      return;
    }
    let old_print = JSON.parse(this.storage.getItem(index.toString()));
    let old_file = this.storage.getItem(index.toString() + "f");
    if (!old_file || !old_print) {
      return;
    }
    this.storage.setItem(index.toString(), JSON.stringify(print));

    this.updateTtl();
  }
  storePrint(print: Print) {
    let len = +this.getLength();
    this.storage.setItem(len.toString(), JSON.stringify(print));
    this.storeFile(len.toString(), print.content);
    len++;
    this.storeLength(len);
    this.updateTtl();
  }
  private updateTtl() {
    let cur_ttl = new Date().valueOf();

    cur_ttl += 30 * 15 * 1000;
    this.storage.setItem("ttl", cur_ttl.toString());
  }
  private storeFile(len: string, file: File) {
    let fileContent = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileContent = reader.result as string;
      this.storage.setItem(len + "f", fileContent);
    };
  }
  deletePrint(index: number) {
    let len = this.getLength();
    if (index >= len || index < 0) {
      return;
    }
    this.storage.removeItem(index.toString());
    this.storage.removeItem(index.toString() + "f");
    for (let i = index + 1; i < len; i++) {
      let print = this.storage.getItem(i.toString());
      let file = this.storage.getItem(i.toString() + "f");
      if (!print || !file) {
        this.storage.clear();
        return;
      }
      this.storage.removeItem(i.toString());
      this.storage.removeItem(i.toString() + "f");
      let j = i - 1;
      this.storage.setItem(j.toString(), print);
      this.storage.setItem(j.toString() + "f", file);
    }
    len--;
    this.storeLength(len);
    this.updateTtl();
  }
  getPrints() {
    let prints: Print[] = [];
    let len = this.getLength();
    for (let i = 0; i < len; i++) {
      let print = JSON.parse(this.storage.getItem(i.toString()));
      if (!print) {
        this.storage.clear();
        return [];
      }
      let file = this.storage.getItem(i.toString() + "f");
      if (!file) {
        this.storage.clear();
        return [];
      }
      let base64 = file;
      let base64Parts = base64.split(",");
      let fileFormat = base64Parts[0].split(";")[0].split(":")[1];
      let fileContent = base64Parts[1];
      let byteArray = new Uint8Array(
        atob(fileContent)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      console.log("format" + fileFormat);
      console.log("content");
      console.log(fileContent);
      print.content = new File([byteArray], print.name, {
        type: fileFormat,
      });
      //print.content=new File(base64);
      prints.push(print);
    }
    console.log(prints);
    return [...prints];
  }
}
