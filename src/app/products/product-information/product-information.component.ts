import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebService} from '../../shared/web/web.service';
import {Product, ProductBuilder} from '../../shared/views/product';
import {ActivatedRoute, Data, Router} from '@angular/router';
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

  constructor(private webService: WebService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.product = new Product();
    this.paramSub = this.route.params
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
              return new ProductBuilder()
                .withVariableCosts(prod.productVariableCost)
                .withBrand(prod.productBrand)
                .withName(prod.productName)
                .withSKU(prod.productSKU)
                .withPrice(prod.productPrice)
                .withID(prod.productID)
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

  deleteProduct() {
    this.webService.deleteProduct(this.id)
      .subscribe(
        (data: Data) => {
          console.log(data);
        },
        (error: Data) => {
          console.log(error);
        }
      )
  }

  onBack() {
    this.router.navigate(['../products']);
  }
}
