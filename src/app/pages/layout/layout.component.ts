import { Component } from '@angular/core';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  products: Products[] = [];

  categories: Array<string> = [
    "headphones",
    "speakers",
    "earphones"
  ]
  modal: boolean = false;

  constructor(private productService: ProductService){}

  openCart(){
    this.modal = !this.modal;
  }
}
