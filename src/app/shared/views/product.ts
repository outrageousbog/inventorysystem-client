export class Product {
  productID: string = '';
  productSKU: string = '';
  productName: string = '';
  productBrand: string = '';
  productPrice: string = '';
  productVariableCost: string = '';

  setSku(sku: string) {
    this.productSKU = sku;
  }

  setID(ID: string) {
    this.productID = ID;
  }

  setName(name: string) {
    this.productName = name;
  }

  setBrand(brand: string) {
    this.productBrand = brand;
  }

  setPrice(price: string) {
    this.productPrice = price;
  }

  setVariableCosts(variableCosts: string) {
    this.productVariableCost=variableCosts;
  }
}

export class ProductBuilder {
  private product = new Product();

  withID(id: string) {
    this.product.setID(id);
    return this;
  }

  withPrice(price: string) {
    this.product.setPrice(price);
    return this;
  }

  withName(name: string) {
    this.product.setName(name);
    return this;
  }

  withBrand(brand: string) {
    this.product.setBrand(brand);
    return this;
  }

  withVariableCosts(variableCosts: string) {
    this.product.setVariableCosts(variableCosts);
    return this;
  }

  withSKU(sku: string) {
    this.product.setSku(sku);
    return this;
  }

  build() {
    return this.product;
  }
}
