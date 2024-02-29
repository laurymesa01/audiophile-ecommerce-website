import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  products: Products[] = [];
  public cart         : Array<Cart> = JSON.parse(localStorage.getItem('cart') || '[]') || [];


  categories: Array<string> = [
    "headphones",
    "speakers",
    "earphones"
  ]
  modal           :boolean  = false;
  modalCategories : boolean = false;
  style = {}


  constructor(private productService: ProductService,
              private router: Router,
              private modalsService: ModalsService){}

  ngOnInit(){
    this.Style;
    this.style = {
      'background-color': 'rgba(0,0,0,0.5)',
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

  openCart(){
    this.modal = true;
  }

  checkout(event: boolean){
    if (this.cart.length > 0) {
      this.router.navigate(['checkout']);
    }
    this.style = {
      'visibility': 'hidden'
    }
  }

  openCategories(){
    this.modalCategories = !this.modalCategories;
    this.modalsService.toggleModal(this.modalCategories);
    this.modalsService.currentCategory$.subscribe(category => {
      this.router.navigate(['', category]);
      // this.style = {
      //   'visibility': 'hidden'
      // }
    });

  }
}
