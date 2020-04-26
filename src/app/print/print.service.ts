import { RouterModule, Routes, Router } from "@angular/router";
import { Print } from "./print.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { LocalStoreService } from "./localStore.service";

@Injectable()
export class PrintService {
  private prints: Print[] = [];
  private printEdited: Subject<Print[]> = new Subject();
  private progressSubject: Subject<number> = new Subject();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStoreService: LocalStoreService
  ) {
    console.log("prints---->");
    this.prints = this.localStoreService.getPrints();
  }

  addFile(file: Print) {
    this.prints.push(file);
    this.localStoreService.storePrint(file);
    this.printEdited.next([...this.prints]);
  }
  getFiles(): Print[] {
    return [...this.prints];
  }
  getFileAddedSub() {
    return this.printEdited.asObservable();
  }
  getprogressSubject() {
    return this.progressSubject.asObservable();
  }
  updateFile(index: number, obj: Print) {
    this.prints[index] = obj;
    this.localStoreService.updatePrint(index, obj);
    this.printEdited.next([...this.prints]);
  }
  deleteFile(index: number) {
    this.prints.splice(index, 1);
    this.localStoreService.deletePrint(index);
    this.printEdited.next([...this.prints]);
  }
  printFiles() {
    let FileData = new FormData();
    for (let i = 0; i < this.prints.length; i++) {
      FileData.append("files[]", this.prints[i].content, this.prints[i].name);
    }

    this.httpClient
      .post("http://54.83.119.157/api/uploadfile", FileData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            let progress = Math.round((event.loaded / event.total) * 100);
            this.progressSubject.next(progress);
            console.log(`Uploaded! ${progress}%`);
            break;
          case HttpEventType.Response:
            console.log("User successfully created!");
            this.uploadFileData(event.body);
        }
      });
    // http://54.83.119.157/api/uploadfile/
  }
  private uploadFileData(file_response: { error: any; data: any }) {
    let assets: {
      file_id: number;
      name: string;
      numOfPrint: number;
      pageType: string;
      startPage: number;
      endPage: number;
      totalPages: number;
      isColor: boolean;
      isSingleSided: boolean;
    }[] = [];
    for (let i = 0; i < this.prints.length; i++) {
      let name = this.prints[i].name.substring(
        0,
        this.prints[i].name.lastIndexOf(".")
      );
      let asset = {
        file_id: -1,
        name: name,
        numOfPrint: this.prints[i].numOfPrint,
        pageType: this.prints[i].pageType,
        startPage: this.prints[i].startPage,
        endPage: this.prints[i].endPage,
        totalPages: this.prints[i].totalPages,
        isColor: this.prints[i].isColor,
        isSingleSided: this.prints[i].isSingleSided,
      };
      assets.push(asset);
    }
    if (!file_response["error"]) {
      console.log(file_response);
      for (let i = 0; i < this.prints.length; i++) {
        console.log({
          ...assets[i],
          file_id: file_response["data"]["files"][i]["id"],
        });
        assets[i] = {
          ...assets[i],
          file_id: file_response["data"]["files"][i]["id"],
        };
      }
      console.log(assets);
      this.httpClient
        .post("http://54.83.119.157/api/updatefiledata", { assets: assets })
        .subscribe((response_data) => {
          console.log(response_data);
        });
      this.router.navigate(["/vendor-list"]);
    }
  }
}
