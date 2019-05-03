import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {


  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Products - InventorySystem');
  }
}
