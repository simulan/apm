import { Component, OnInit } from '@angular/core';
import { IProduct } from './iproduct';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls : ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  _listFilter = '';
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
      }
  set listFilter(value: string) {
    this._listFilter = value;
  }
  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {
  }

  filter(filter: string): IProduct[] {
    filter = filter.toLowerCase();
    return this.products.filter( x => x.productName.toLowerCase().indexOf(filter) > -1);
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  onRatingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products,
        this.filteredProducts = this.products;
      },
      errorMessage => this.errorMessage = errorMessage
    );
    this.filteredProducts = this.listFilter ? this.filter(this.listFilter) : this.products;
  }
}
