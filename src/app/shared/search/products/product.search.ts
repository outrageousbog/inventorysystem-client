export class ProductSearch {
  query = '';
  private contains = '';
  private orderBy = '';
  private onlyStock = '';


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=contains(${keyToContain}, '${name.toUpperCase()}')`;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
  }
  setOnlyStock() {
  }

  build() {
    this.query = `products?${this.contains}${this.orderBy}${this.onlyStock}`;
  }
}

export class ProductSearchBuilder {
  private productSearch: ProductSearch = new ProductSearch();

  withContains(keyToContain: string, name: string) {
    this.productSearch.setContains(keyToContain, name);
    return this;
  }

  withOrderBy(name: string) {
    this.productSearch.setOrderBy(name);
    return this;
  }

  withOnlyStock(showOnlyStock: boolean) {
    showOnlyStock ? this.productSearch.setOnlyStock() : null;
    return this;
  }

  build() {
    this.productSearch.build();
    return this.productSearch;
  }
}

