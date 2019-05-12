import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebService} from '../../shared/web/web.service';
import {MaterialSearchBuilder} from '../../shared/search/materials/material.search';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialForm: FormGroup;
  searchComplete = false;

  constructor(private webService: WebService) {
  }

  ngOnInit() {
    this.materialForm = new FormGroup({
      'materialName': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.webService.createMaterial(this.materialForm.value)
      .subscribe(
        () => {
          this.materialForm.reset();
          this.searchComplete = true;
          const query = new MaterialSearchBuilder().build().query;
          this.webService.getMaterialsByQuery(query);
        },
      );
  }

  onClose() {
    this.searchComplete = false;
  }
}
