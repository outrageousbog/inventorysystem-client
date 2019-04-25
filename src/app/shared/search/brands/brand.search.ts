export class BrandSearch {
  query = '';
  private contains: string = '';
  private orderBy: string = '';


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=contains(${keyToContain}, '${name}')`;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
  }

  build() {
    this.query = `brands?${this.contains}${this.orderBy}`;
  }
}

export class BrandSearchBuilder {
  private brandSearch: BrandSearch = new BrandSearch();

  withContains(keyToContain: string, name: string) {
    this.brandSearch.setContains(keyToContain, name);
    return this;
  }

  withOrderBy(name: string) {
    this.brandSearch.setOrderBy(name);
    return this;
  }

  build() {
    this.brandSearch.build();
    return this.brandSearch;
  }
}
