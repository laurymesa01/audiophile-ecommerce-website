import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Products } from 'src/app/interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{


  product: Products = {
    id: 0,
    slug: '',
    name: '',
    image: {
      mobile: '',
      tablet: '',
      desktop: ''
    },
    category: '',
    categoryImage: {
      mobile: '',
      tablet: '',
      desktop: ''
    },
    new: false,
    price: 0,
    description: '',
    features: '',
    includes: [],
    gallery: {
      first: {
        mobile: '',
        tablet: '',
        desktop: ''
      },
      second: {
        mobile: '',
        tablet: '',
        desktop: ''
      },
      third: {
        mobile: '',
        tablet: '',
        desktop: ''
      }
    },
    others: []
  };


  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private location: Location,
              private cartService: CartService,){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.productService.getProductById(id)))
      .subscribe(product => {
        this.product = product
      })
  }

  goBack(){
    this.location.back();
  }

  addToCart(product: Products){
    this.cartService.changeCart(product);
  }

  increaseProduct(product: Products){
    this.cartService.increaseProduct(product);
  }

}
