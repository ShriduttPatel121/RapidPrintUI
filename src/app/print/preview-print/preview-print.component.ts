import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Print } from "../print.model";

@Component({
  selector: "app-preview-print",
  templateUrl: "./preview-print.component.html",
  styleUrls: ["./preview-print.component.css"],
})
export class PreviewPrintComponent implements OnInit {
  printContent: string;
  page: number = 1;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Print,
    private dialogRef: MatDialogRef<PreviewPrintComponent>
  ) {
    this.page = data.startPage;
    const reader = new FileReader();
    reader.readAsDataURL(data.content);
    reader.onload = () => {
      this.printContent = reader.result as string;
    };
  }
  nextPage() {
    this.page++;
  }
  close() {
    this.dialogRef.close();
  }
  prevPage() {
    this.page--;
  }
  ngOnInit() {}
}
