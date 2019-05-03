import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {


  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Brands - InventorySystem');
  }
}
