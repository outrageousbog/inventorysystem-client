interface ISearch {
  query: string;

  build();

  setOrderBy(name: string);

  setContains(keyToContain: string, name: string);
}
