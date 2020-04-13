export class Print {
  name: string;
  numOfPrint: number;
  isColor: boolean;
  totalPages: number;
  startPage: number;
  endPage: number;
  isSingleSided: boolean;
  pageType: string;
  content: File;
  size: number;
  constructor(
    name: string,
    numOfPrint: number,
    isColor: boolean,
    totalPages: number,
    isSingleSided: boolean,
    pageType: string,
    content: File,
    size: number
  ) {
    this.name = name;
    this.numOfPrint = numOfPrint;
    this.isColor = isColor;
    this.totalPages = totalPages;
    this.isSingleSided = isSingleSided;
    this.pageType = pageType;
    this.content = content;
    this.size = size;
    this.startPage = 1;
    this.endPage = totalPages;
  }
  getOption() {
    const end = this.totalPages;
    return { floor: 1, ceil:end};
  }
}
