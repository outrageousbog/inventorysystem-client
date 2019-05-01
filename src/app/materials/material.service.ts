import {Injectable} from '@angular/core';
import {WebService} from '../shared/web/web.service';
import {Data} from '@angular/router';
import {Material, MaterialBuilder} from '../shared/views/material';
import {Subject} from 'rxjs';
import {MaterialSearchBuilder} from '../shared/search/materials/material.search';

@Injectable()
export class MaterialService {
  private materialList: Material[];
  materialSearchSubject = new Subject();
  private materialSearchBuilder = new MaterialSearchBuilder();

  constructor(private webService: WebService) {}

  getMaterialsList() {
    return this.materialList.slice();
  }

  private searchMaterial(query: string) {
    this.webService.getMaterialsByQuery(query)
      .subscribe(
        (data: Material[]) => {
          this.materialList = data.map(
            (material) => {
              return new MaterialBuilder()
                .withID(material.materialID)
                .withName(material.materialName)
                .build();
            }
          );
          this.materialSearchSubject.next(this.materialList);
        },
        (error: Data) => {
          console.log(error);
        }
      )
  }

  search(searchValue: string){
    if (searchValue != null){
      this.materialSearchBuilder.withContains('brandName', searchValue);
    }
    let searchQuery = this.materialSearchBuilder.build();
    console.log(this.materialSearchBuilder.build());
    this.searchMaterial(searchQuery.query);
  }
}

