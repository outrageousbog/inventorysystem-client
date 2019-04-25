export class ProductSearch {
  query = '';
  private contains = '';
  private orderBy = '';


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=contains(${keyToContain}, '${name.toUpperCase()}')`;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
  }

  build() {
    this.query = `products?${this.contains}${this.orderBy}`;
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

  build() {
    this.productSearch.build();
    return this.productSearch;
  }
}

