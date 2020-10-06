import {
  Directive,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDragAndDrop]",
})
export class DragAndDropDirective {
  @HostBinding("class.fileover") fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  // Dragover listener
  @HostListener("dragover", ["$event"]) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener("dragleave", ["$event"]) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }
  @HostListener("drop", ["$event"]) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;

    console.dir(evt.dataTransfer);
    console.log(evt.dataTransfer);
    let files = evt.dataTransfer.files;

    this.fileDropped.emit(files);
  }
}
