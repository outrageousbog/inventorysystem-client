export class Material {
  get materialName(): string {
    return this._materialName;
  }
  get materialID(): number {
    return this._materialID;
  }
  private _materialID: number;
  private _materialName: string;

  setMaterialID(id: number) {
    this._materialID = id;
  }

  setMaterialName(name: string) {
    this._materialName = name
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
