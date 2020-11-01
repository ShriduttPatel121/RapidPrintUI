import { AuthService } from "angularx-social-login";
import { PrintService } from "./../print.service";
import { Component, OnInit } from "@angular/core";
import { Print } from "../print.model";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { PreviewPrintComponent } from "../preview-print/preview-print.component";
import { LabelType } from "ng5-slider";
import { Order } from "../order.model";
import { GoogleDriveSelectorService } from "../GoogleDriveSelectorService";
import { AuthenticationService } from 'src/app/auth/auth.service';
import { User } from '../../user/user.model';
import { EditPrintComponent } from '../edit-print/edit-print.component';
declare var gapi: any;
declare var google: any;
@Component({
  selector: "app-add-print",
  templateUrl: "./add-print.component.html",
  styleUrls: ["./add-print.component.css"],
})
export class AddPrintComponent implements OnInit {
  pdfSrc: string;
  order: Order = new Order();
  page: number = 1;
  totalPages: number;
  printAddedSub: Subscription;
  progressSub: Subscription;
  isLoaded: boolean = false;
  progress: number = 0;
  user: User = new User();
  constructor(
    private printService: PrintService,
    public previewDialog: MatDialog,
    public editDialog: MatDialog,
    private authenticationService: AuthenticationService,
    private googleDriveSelectorService: GoogleDriveSelectorService
  ) {
    this.order.prints = this.printService.getFiles();
    this.printAddedSub = this.printService
      .getFileAddedSub()
      .subscribe((prints: Print[]) => {
        this.order.prints = prints;
        console.log(this.order.prints);
      });

    this.progressSub = this.printService
      .getprogressSubject()
      .subscribe((progress) => {
        this.progress = progress;
      });
  }
  incrementCopies(index: number) {
    if (this.order.prints[index].numOfPrint <= 0) {
      this.order.prints[index].numOfPrint = 1;
      return;
    }
    this.order.prints[index].numOfPrint++;
  }
  decrementCopies(index: number) {
    if (this.order.prints[index].numOfPrint <= 1) {
      //this.prints[index].numOfPrint = 1;
      return;
    }
    this.order.prints[index].numOfPrint--;
  }
  changePrint(index: number) {
    console.log(index);
    console.log(this.order.prints[index]);
    this.printService.updateFile(this.order.prints[index]);
  }
  deleteFile(index: number) {
    this.printService.deleteFile(this.order.prints[index]);
  }
  submitPrint() {
    this.printService.createOrder();
  }
  ngOnInit() {
    this.authenticationService.getUserDetails().subscribe(
      (val: { error: boolean; data: any }) => {
        this.user = val.data;
        console.log(this.user.profile);
      },
      (error) => {
        console.log(error);
      }
    );
    this.authenticationService.getUserChangedSub().subscribe(
      (val) => {
        console.log(val);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  translate(value: number, label: LabelType) {
    switch (label) {
      case LabelType.Low:
        return "<b>Start Page:</b>" + value;
      case LabelType.High:
        return "<b>End Page:</b>" + value;
      default:
        return value;
    }
  }
  checkFileType(name: string) {
    let ext = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    if (!(ext === "pdf")) {
      return false;
    }
    return true;
  }
  handleUpload(files: FileList, filePath: Event) {
    console.log("upload.....");
    let uploadedPrint: Print[] = [];
    if (!files || files.length <= 0) {
      return;
    }
    let prints = files;
    for (let i = 0; i < prints.length; i++) {
      const content = files[i];
      if (!this.checkFileType(content.name)) {
        continue;
      }
      let name = content.name;
      const size = content.size;
      const reader = new FileReader();
      reader.readAsDataURL(content);
      reader.onload = () => {
        let pdfSrc = reader.result as string;
        let bin = atob(pdfSrc.split(",")[1]);
        let pageCount = bin.match(/\/Type\s*\/Page\b/g).length;
        console.log("PC......." + pageCount);
        let addedPrint: Print = new Print(
          name,
          1,
          false,
          pageCount,
          true,
          "A3",
          content,
          size
        );
        console.dir(addedPrint);
        uploadedPrint.push(addedPrint);
        this.printService.addFile(addedPrint);
        if (filePath) {
          filePath.srcElement["value"] = "";
        }
      };
    }
  }
  previewFile(index: number) {
    this.previewDialog.open(PreviewPrintComponent, {
      data: this.order.prints[index],
      width: "850px",
      height: "850px",
    });
  }
  loadGoogleDrive() {
    this.googleDriveSelectorService.loadGoogleDrive();
  }
  editPrint()
  {
    this.editDialog.open(EditPrintComponent,{
      width: "37rem",
      height: "35rem",
    })
  }
}
