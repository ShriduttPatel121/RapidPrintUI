
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { UserService } from '../user.service';

@Component({
  selector: "app-add-details",
  templateUrl: "./add-details.component.html",
  styleUrls: ["./add-details.component.css"],
})
export class AddDetailsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  gender: string = "male";
  imageUrl: string = "";
  image: File;
  maxDate: Date = new Date();
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      dobCtrl: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      mobCtrl: ["", Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      imgCtrl: ["", Validators.required],
    });
  }
  submit() {
    if (!this.isValid()) {
      return;
    }
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.gender);
    let name = this.firstFormGroup.value.nameCtrl;
    let dob: Date = this.secondFormGroup.value.dobCtrl;
    let mob = this.thirdFormGroup.value.mobCtrl;
    console.log(this.datePipe.transform(dob, "yyyy-MM-dd"));
    this.userService.setName(name);
    this.userService.setDob(this.datePipe.transform(dob, "yyyy-MM-dd"));
    this.userService.setGender(this.gender);
    this.userService.setMob(mob);
    this.userService.setProfile(this.image);
    console.log(this.userService.getUser());
    this.userService.signup();
  }
  handleUpload(filePath: Event) {
    if ((filePath.target as HTMLInputElement).files.length <= 0) {
      return;
    }
    this.image = (filePath.target as HTMLInputElement).files[0];
    let ext = this.image.name
      .substring(this.image.name.lastIndexOf(".") + 1)
      .toLowerCase();
    if (!(ext === "jpeg" || ext === "jpg" || ext === "png")) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
  isValid() {
    return (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    );
  }
}
