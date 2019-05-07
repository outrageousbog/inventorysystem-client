export class Brand {

  private _brandID: string;
  private _brandName: string;

  setId(id: string) {
    this._brandID = id;
  }

  setName(name: string) {
    this._brandName = name;
  }

  get brandID(): string {
    return this._brandID;
  }
  get brandName(): string {
    return this._brandName;
  }
}

export class BrandBuilder {
  private brand = new Brand();

  withID(id: string) {
    this.brand.setId(id);
    return this;
  }

  withName(name: string) {
    this.brand.setName(name);
    return this;
  }

  build() {
    return this.brand;
  }
}
