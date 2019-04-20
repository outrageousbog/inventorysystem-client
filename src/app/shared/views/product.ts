export class Product {
  productSKU: string = '';
  productName: string = '';
  productBrand: string = '';
  productPrice: string = '';

  setSku(sku: string) {
    this.productSKU = sku;
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

  build() {
    return this;
  }
}
