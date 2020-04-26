import { PrintService } from "./../print.service";
import { Component, OnInit } from "@angular/core";
import { Print } from "../print.model";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { PreviewPrintComponent } from "../preview-print/preview-print.component";

@Component({
  selector: "app-add-print",
  templateUrl: "./add-print.component.html",
  styleUrls: ["./add-print.component.css"],
})
export class AddPrintComponent implements OnInit {
  pdfSrc: string;
  prints: Print[];
  page: number = 1;
  totalPages: number;
  printAddedSub: Subscription;
  progressSub: Subscription;
  isLoaded: boolean = false;
  progress: number = 0;
  constructor(
    private printService: PrintService,
    public priviewDialog: MatDialog
  ) {
    this.prints = this.printService.getFiles();
    this.printAddedSub = this.printService
      .getFileAddedSub()
      .subscribe((prints: Print[]) => {
        this.prints = prints;
        console.log(this.prints);
      });

    this.progressSub = this.printService
      .getprogressSubject()
      .subscribe((progress) => {
        this.progress = progress;
      });
  }
  changePrint(index: number) {
    console.log(index);
    console.log(this.prints[index]);
    this.printService.updateFile(index, this.prints[index]);
  }
  deleteFile(index: number) {
    this.printService.deleteFile(index);
  }
  submitPrint() {
    this.printService.printFiles();
  }
  ngOnInit() {}
  handleUpload(filePath: Event) {
    console.log("upload.....");

    console.dir(filePath.target);
    if (
      !filePath.target ||
      (filePath.target as HTMLInputElement).files.length <= 0
    ) {
      return;
    }

    const content = (filePath.target as HTMLInputElement).files[0];

    let ext = content.name
      .substring(content.name.lastIndexOf(".") + 1)
      .toLowerCase();
    if (!(ext === "pdf")) {
      return;
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
      this.printService.addFile(addedPrint);
      filePath.srcElement["value"] = "";
    };
  }
  previewFile(index: number) {
    this.priviewDialog.open(PreviewPrintComponent, {
      data: this.prints[index],
      width: "850px",
      height: "850px",
    });
  }
}
