import { Print } from "./print.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class PrintService {
  constructor(private httpClient: HttpClient) {}
  private prints: Print[] = [];
  private printEdited: Subject<Print[]> = new Subject();
  addFile(file: Print) {
    this.prints.push(file);
    this.printEdited.next([...this.prints]);
  }
  getFiles(): Print[] {
    return [...this.prints];
  }
  getFileAddedSub() {
    return this.printEdited.asObservable();
  }
  updateFile(index: number, obj: Print) {
    this.prints[index] = obj;
    this.printEdited.next([...this.prints]);
  }
  deleteFile(index: number) {
    this.prints.splice(index, 1);
    this.printEdited.next([...this.prints]);
  }
  printFiles() {
    let arr: any[] = [];
    let FileData = new FormData();
    for (let i = 0; i < this.prints.length; i++) {
      // FileData.append("name", this.prints[i].name);
      // FileData.append("numOfPrint", this.prints[i].numOfPrint.toString());
      // FileData.append("pageType", this.prints[i].pageType);
      // FileData.append("size", this.prints[i].size.toString());
      // FileData.append("startPage", this.prints[i].startPage.toString());
      // FileData.append("endPage", this.prints[i].endPage.toString());
      // FileData.append("totalPages", this.prints[i].totalPages.toString());
      // FileData.append("isColor", this.prints[i].isColor.toString());
      // FileData.append("isSingleSided", this.prints[i].isSingleSided.toString());
      // FileData.append("content", this.prints[i].content, this.prints[i].name);
      arr.push(this.prints[i]);
    }
    console.log(arr);
    FileData.append("assets", JSON.stringify(arr));
    //console.log(FileData.getAll("name"));
    console.log(JSON.stringify(arr));
    this.httpClient
      .post("http://54.83.119.157/api/uploadfile/", FileData)
      .subscribe();
  }
}
