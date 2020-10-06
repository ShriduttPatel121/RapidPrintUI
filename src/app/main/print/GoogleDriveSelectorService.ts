import { HttpClient } from "@angular/common/http";
import { PrintService } from "./print.service";
import { Print } from "./print.model";
import { Injectable } from "@angular/core";
declare var gapi: any;
declare var google: any;

@Injectable()
export class GoogleDriveSelectorService {
  constructor(private printService: PrintService) {}
  developerKey = "pULVxG7yOqxwObWjksD0NPh5";
  clientId =
    "739449918369-juivcj9bgg50naruqupe1rag45flgc1r.apps.googleusercontent.com";
  scope = ["profile", "email", "https://www.googleapis.com/auth/drive"].join(
    " "
  );
  pickerApiLoaded = false;
  oauthToken?: any;
  loadGoogleDrive() {
    gapi.load("auth", { callback: this.onAuthApiLoad.bind(this) });
    gapi.load("picker", { callback: this.onPickerApiLoad.bind(this) });
  }
  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        client_id: this.clientId,
        scope: this.scope,
        immediate: false,
      },
      this.handleAuthResult.bind(this)
    );
  }
  onPickerApiLoad() {
    this.pickerApiLoaded = true;
  }
  handleAuthResult(authResult) {
    let src;
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        let view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("application/pdf");
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder
          //   .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .setOAuthToken(authResult.access_token)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setCallback((e) => {
            if (
              e[google.picker.Response.ACTION] == google.picker.Action.PICKED
            ) {
              let docs = e[google.picker.Response.DOCUMENTS];
              for (let i = 0; i < docs.length; i++) {
                let doc = e[google.picker.Response.DOCUMENTS][i];
                src = doc[google.picker.Document.URL];
                console.log("Document selected is", doc, "and URL is ", src);
                console.log(e);
                this.getFile(doc["id"]);
              }
            }
          })
          .build();
        picker.setVisible(true);
      }
    }
  }
  getFile(fileId) {
    console.log("Get file for---" + fileId);
    gapi.load("client", () => {
      gapi.client.load("drive", "v2", () => {
        var file = gapi.client.drive.files.get({
          fileId: fileId,
        });
        file.execute((file) => {
          console.log(file.selfLink);
          this.downloadFile(file);
        });
      });
    });
  }
  downloadFile(file) {
    console.log("inside download file..");
    if (file.selfLink) {
      console.log("inside download for ");
      var accessToken = gapi.auth.getToken().access_token;

      fetch(file.selfLink + "?alt=media", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => response.blob())
        .then((response) => {
          let content = new File([response], file.title);
          let name = content.name;
          const size = content.size;
          console.log(content.type);
          const reader = new FileReader();
          reader.readAsDataURL(content);
          reader.onload = () => {
            console.log("content onLoad...");
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
          };
        });
    }
  }
}
