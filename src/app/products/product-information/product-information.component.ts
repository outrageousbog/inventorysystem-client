import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product} from '../../shared/views/product';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, OnDestroy {
  product: Product;
  paramSub: Subscription;
  private id: number;
  protected isSearched: boolean = false;

  constructor(private webService: WebService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.product = new Product();
    this.paramSub = this.router.params
      .subscribe(params => {
        this.id = +params['id'];
        this.getProduct();
      });
  }

  private getProduct() {
    /**
     * Receives object array from API, converts the object at index 0 (there will only be 1 product with the unique ID) to
     * product object
     */
    this.webService.getProductsByQuery(`?$filter=productID eq ${this.id}`)
      .subscribe(
        (data: Product[]) => {
          console.log(data);
          let tempProd: Product[] = data.map(
            (prod) => {
              return new Product()
                .setVariableCosts(prod.productVariableCost)
                .setBrand(prod.productBrand)
                .setName(prod.productName)
                .setSku(prod.productSKU)
                .setPrice(prod.productPrice)
                .setID(prod.productID)
                .build();
            }
          );
          //CONVERTS TO OBJECT
          this.product = tempProd[0];
          console.log(this.product);
        },
        (error: Data) => {
          console.log(error);
        }
      );
    this.isSearched = true;
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
