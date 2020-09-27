import { RouterModule, Routes, Router } from "@angular/router";
import { Print } from "./print.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { LocalStoreService } from "./localStore.service";
import { Order } from "./order.model";

@Injectable()
export class PrintService {
  //private order.prints: Print[] = [];
  private order: Order = new Order();
  private printEdited: Subject<Print[]> = new Subject();
  private progressSubject: Subject<number> = new Subject();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStoreService: LocalStoreService
  ) {
    this.fetchFiles();
  }

  createOrder() {
    this.httpClient
      .get("http://34.226.216.44/api/createorder")
      .subscribe((response: { data: any; error: boolean }) => {
        if (response.error) {
          return;
        }
        console.log(response);
        let orderId = response.data["order_id"];
        this.localStoreService.storeOrderId(orderId);
        this.router.navigate(["/vendor-list"]);
      });
  }
  fetchFiles() {
    this.httpClient
      .get("http://34.226.216.44/api/filelist")
      .subscribe((response: { error: boolean; data: any }) => {
        if (response.error) {
          return;
        }
        this.order.prints = [...response.data["files"]];
        this.printEdited.next([...this.order.prints]);
      });
  }
  addFile(files_data: Print) {
    this.uploadFile(files_data);
  }
  getFiles(): Print[] {
    return [...this.order.prints];
  }
  getFileAddedSub() {
    return this.printEdited.asObservable();
  }
  getprogressSubject() {
    return this.progressSubject.asObservable();
  }
  updateFile(file_data: Print) {
    this.uploadFileData(file_data);
  }
  deleteFile(file_data: Print) {
    this.httpClient
      .get("http://34.226.216.44/api/delete-printdata/" + file_data.id)
      .subscribe(
        (response: { error: boolean; data: any }) => {
          if (response.error) {
            this.fetchFiles();
            return;
          }
          console.log(response);
          this.fetchFiles();
        },
        (err) => {
          console.log(err);
          this.fetchFiles();
        }
      );
  }

  private uploadFile(file_data: Print) {
    let FileData = new FormData();
    FileData.append("files[]", file_data.content, file_data.name);

    this.httpClient
      .post("http://34.226.216.44/api/uploadfile", FileData)
      .subscribe((response: { error: boolean; data: any }) => {
        if (response.error) {
          return;
        }
        console.log("response--->>");
        console.log(response);
        let fileId = response.data["files"][0]["id"];
        file_data.file_id = fileId;
        console.log(fileId);
        this.uploadFileData(file_data);
      });
  }

  private uploadFileData(file_data: Print) {
    let assets: Print[] = [];

    let name = file_data.name;
    if (file_data.name.includes(".")) {
      name = file_data.name.substring(0, file_data.name.lastIndexOf("."));
    }
    let asset: any = {
      id: file_data.id,
      file_id: file_data.file_id,
      name: name,
      numOfPrint: file_data.numOfPrint,
      pageType: file_data.pageType,
      startPage: file_data.startPage,
      endPage: file_data.endPage,
      totalPages: file_data.totalPages,
      isColor: file_data.isColor,
      isSingleSided: file_data.isSingleSided,
    };
    assets.push(asset);
    console.log(assets);
    this.httpClient
      .post("http://34.226.216.44/api/updatefiledata", { assets: assets })
      .subscribe(
        (response_data) => {
          console.log(response_data);
          this.fetchFiles();
        },
        (error) => {
          console.log(error);
          this.fetchFiles();
        }
      );
  }

  // this.router.navigate(["/vendor-list"]);
}
