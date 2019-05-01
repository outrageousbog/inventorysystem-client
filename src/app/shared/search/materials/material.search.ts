export class MaterialSearch {
  query = '';
  private contains: string = '';
  private orderBy: string = '';


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=contains(${keyToContain}, '${name.toUpperCase()}')`;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
  }

  build() {
    this.query = `brands?${this.contains}${this.orderBy}`;
  }
}

export class MaterialSearchBuilder {
  private materialSearch: MaterialSearch= new MaterialSearch();

  withContains(keyToContain: string, name: string) {
    this.materialSearch.setContains(keyToContain, name);
    return this;
  }

  withOrderBy(name: string) {
    this.materialSearch.setOrderBy(name);
    return this;
  }

  build() {
    this.materialSearch.build();
    return this.materialSearch;
  }
}
