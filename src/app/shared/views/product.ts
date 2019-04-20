export class Product {
  productID: string = '';
  productSKU: string = '';
  productName: string = '';
  productBrand: string = '';
  productPrice: string = '';
  productVariableCost: string = '';

  setSku(sku: string) {
    this.productSKU = sku;
    return this;
  }

  setID(ID: string) {
    this.productID = ID;
    return this;
  }

  setName(name: string) {
    this.productName = name;
    return this;
  }

  setBrand(brand: string) {
    this.productBrand = brand;
    return this;
  }

  setPrice(price: string) {
    this.productPrice = price;
    return this;
  }

  setVariableCosts(variableCosts: string) {
    this.productVariableCost=variableCosts;
    return this;
  }

  build() {
    return this;
  }
}
