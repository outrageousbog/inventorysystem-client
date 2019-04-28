import {Component, OnInit} from '@angular/core';
import {SearchService} from '../shared/search/search.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  providers: [SearchService]
})
export class BrandsComponent implements OnInit {


  constructor() {}

  ngOnInit() {
  }
}
