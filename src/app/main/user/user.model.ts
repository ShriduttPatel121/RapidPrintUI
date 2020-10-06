export class User {
  name: string;
  email: string;
  password: string;
  idtoken: string;
  gender: string;
  dob: string;
  mobile: string;
  profile: File | string;
  //   constructor(
  //     name: string,
  //     gender: string,
  //     dob: string,
  //     mobile: string,
  //     email?: string,
  //     password?: string,
  //     idtoken?: string
  //   ) {
  //     this.name = name;
  //     this.email = email;
  //     this.password = password;
  //     this.dob = dob;
  //     this.gender = gender;
  //     this.mobile = mobile;
  //     this.idtoken = idtoken;
  //   }
  constructor() {
   // this.profile = "https://www.w3schools.com/howto/img_avatar.png";
  }
}
