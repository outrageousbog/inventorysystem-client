export class Brand {
  public brandID: string;
  public brandName: string;

  setId(id: string) {
    this.brandID = id;
  }

  setName(name: string) {
    this.brandName = name;
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
