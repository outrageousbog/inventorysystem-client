export class ProductSearchBuilder implements ISearch{
  query: string = '';
  private contains: string = '';
  private orderBy: string = '';


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=contains(${keyToContain}, '${name}')`;
    return this;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
    return this;
  }

  build() {
    this.query = `products?${this.contains}${this.orderBy}`;
    return this;
  }
}
