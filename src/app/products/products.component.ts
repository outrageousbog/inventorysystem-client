import {Component, OnInit} from '@angular/core';
import {SearchService} from '../shared/search/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [SearchService],
})
export class ProductsComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}
