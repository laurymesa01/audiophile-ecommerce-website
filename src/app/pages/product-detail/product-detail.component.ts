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

  public cart: Array<Cart> = JSON.parse(localStorage.getItem('cart') || '[]') || [];
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
  disabled: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private location: Location,
              private cartService: CartService,){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.productService.getProductById(id)))
      .subscribe(product => {
        this.product = product;
        this.searchProductInCart(this.product.id);
      })
    if (this.cart.length > 0) {
      this.disabled = true;
    }
  }

  goBack(){
    this.location.back();
  }

  addToCart(product: Products){
    this.cartService.changeCart(product);
    this.disabled = true;
  }

  increaseProduct(product: Products){
    this.cartService.increaseProduct(product);
    this.cartService.currentDataCart$.subscribe( cart => {
      let index = cart.findIndex(cart => cart.product.id === product.id);
      this.cart = cart;
      this.quantity = cart[index].quantity;
      this.saveLocalStorage();
    })
  }

  decreaseProduct(product: Products){
    this.cartService.decreaseProduct(product);
    this.cartService.currentDataCart$.subscribe( cart => {
      let index = cart.findIndex(cart => cart.product.id === product.id);
      this.cart = cart;
      this.quantity = cart[index].quantity;
      this.saveLocalStorage();
    })
  }

  searchProductInCart(id: number){
    console.log('ID',id);
    console.log('CART', this.cart);
    let index = this.cart.findIndex(cart => cart.product.id === id);
    console.log('index',index);
    if(index !== -1){
      this.quantity = this.cart[index].quantity;
      console.log('Q',this.quantity);
    }
  }

  saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

}
