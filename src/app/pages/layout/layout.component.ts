import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  products: Products[] = [];

  categories: Array<string> = [
    "headphones",
    "speakers",
    "earphones"
  ]
  modal           : boolean = false;
  modalCategories : boolean = false;


  constructor(private productService: ProductService,
              private router: Router){}

  ngOnInit(){
    this.Style;
    console.log(this.router.url);

  }

  public get Style(){
    let style = {};
    if (this.router.url === '/') {
      style = {
        'background-color': 'transparent',
        'position': 'absolute',
        'width': '100%'
      }
    }
    return style;
  }

  openCart(){
    this.modal = !this.modal;
  }

  openCategories(){
    this.modalCategories = !this.modalCategories;
  }
}
