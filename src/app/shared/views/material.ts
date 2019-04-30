export class Material {
  public materialID: number;
  public materialName: string;

  setMaterialID(id: number) {
    this.materialID = id;
  }

  setMaterialName(name: string) {
    this.materialName = name
  }
}

export class MaterialBuilder {
  private material = new Material();

  withID(id: number) {
    this.material.setMaterialID(id);
    return this;
  }

  withName(name: string) {
    this.material.setMaterialName(name);
    return this;
  }

  build() {
    return this.material;
  }
}
