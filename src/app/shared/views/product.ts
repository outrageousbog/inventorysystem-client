export class Product {


  private _productID: string = '';
  private _productSKU: string = '';
  private _productName: string = '';
  private _productBrand: string = '';
  private _productPrice: string = '';
  private _productVariableCost: string = '';
  private _productQuantity: number;
  private _productGrowthFactor: number;
  private _productStartFactor: number;

  get productStartFactor(): number {
    return this._productStartFactor;
  }
  get productGrowthFactor(): number {
    return this._productGrowthFactor;
  }

  get productID() {
    return this._productID;
  }

  get productSKU() {
    return this._productSKU;
  }

  get productName() {
    return this._productName
  }

  get productBrand() {
    return this._productBrand
  }

  get productQuantity(): number {
    return this._productQuantity;
  }
  get productVariableCost(): string {
    return this._productVariableCost;
  }
  get productPrice(): string {
    return this._productPrice;
  }


  setSku(sku: string) {
    this._productSKU = sku;
  }

  setID(ID: string) {
    this._productID = ID;
  }

  setName(name: string) {
    this._productName = name;
  }

  setBrand(brand: string) {
    this._productBrand = brand;
  }

  setPrice(price: string) {
    this._productPrice = price;
  }

  setVariableCosts(variableCosts: string) {
    this._productVariableCost=variableCosts;
  }

  setAmount(amount: number) {
    this._productQuantity = amount;
  }

  setGrowthFactor(amount: number) {
    this._productGrowthFactor = amount;
  }

  setStartFactor(amount: number) {
    this._productStartFactor = amount;
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

  withAmount(amount: number) {
    this.product.setAmount(amount);
    return this;
  }

  withGrowthFactor(factor: number) {
    this.product.setGrowthFactor(factor)
    return this;
  }

  withStartFactor(factor: number) {
    this.product.setStartFactor(factor);
    return this;
  }

  build() {
    return this.product;
  }
}
