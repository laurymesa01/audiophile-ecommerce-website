import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Products } from 'src/app/interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  quantity: number = 0;

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
        this.product = product;
      })
      const cart: Array<Cart> = JSON.parse(localStorage.getItem('cart')!) || [];
      let index = cart.findIndex(cart => cart.product.id == this.product.id);
      console.log(cart[index].product.id);
      this.quantity = cart[index].quantity;
  }

  goBack(){
    this.location.back();
  }

  addToCart(product: Products){
    this.cartService.changeCart(product);
  }

  increaseProduct(product: Products){
    this.cartService.increaseProduct(product);
    this.cartService.currentDataCart$.subscribe( cart => {
      let index = cart.findIndex(cart => cart.product.id === product.id);
      this.quantity = cart[index].quantity;
      // this.saveLocalStorage();
    })
  }

  decreaseProduct(product: Products){
    this.cartService.decreaseProduct(product);
    this.cartService.currentDataCart$.subscribe( cart => {
      let index = cart.findIndex(cart => cart.product.id === product.id);
      this.quantity = cart[index].quantity;
      // this.saveLocalStorage();
    })
  }

}
