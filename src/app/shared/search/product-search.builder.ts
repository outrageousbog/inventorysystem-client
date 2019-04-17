export class ProductSearchBuilder implements ISearch{
  query: string;
  private contains: string;
  private orderBy: string;


  setContains(keyToContain: string, name: string) {
    this.orderBy = `$Filter=${keyToContain} eq '${name}'`;
  }
  setOrderBy(name: string) {
    this.contains = `$OrderBy=${name}&`;
  }

  build() {
    this.query = `brands?${this.contains}${this.orderBy}`
  }
}
