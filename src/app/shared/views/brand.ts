export class Brand {
  public brandID: number;
  public brandName: string;

  setId(id:number) {
    this.brandID = id;
    return this;
  }

  setName(name: string) {
    this.brandName = name;
    return this;
  }

  build() {
    return this;
  }
}
