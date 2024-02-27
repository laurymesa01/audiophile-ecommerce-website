import { Component, OnInit, ViewChild } from '@angular/core';
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
  modal           :boolean  = false;
  modalCategories : boolean = false;
  style = {}


  constructor(private productService: ProductService,
              private router: Router){}

  ngOnInit(){
    this.Style;
    this.style = {
      'filter': 'blur(0)',
    }
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

  public get StyleBackdrop(){
    let style = {};
    style = {
      'background-color': 'rgba(0,0,0,0.5)'
    }
    return style;
  }

  openCart(){
    this.modal = true;
    // this.style = {
    //   'filter': 'blur(4px)',
    // }
  }

  openCategories(){
    this.modalCategories = !this.modalCategories;
  }
}
