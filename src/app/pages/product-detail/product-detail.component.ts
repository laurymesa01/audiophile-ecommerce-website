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
    // this.activatedRoute.params
    //   .pipe(switchMap(({id}) => this.productService.getProductById(id)))
    //   .subscribe(product => {
    //     this.product = product;
    //     this.searchProductInCart(this.product.id);
    //   });
    this.activatedRoute.paramMap.subscribe(params => {
      const param = params.get('param');
      if (param) {
        if (isNaN(Number(param))) {
          this.productService.getProductBySlug(param).subscribe({
            next: (product) => {
              this.product = product[0];
              this.searchProductInCart(this.product.id);
              this.disabledButton();
            }
          })
        }
        else{
          this.productService.getProductById(param).subscribe({
            next: (product) => {
              this.product = product;
              this.searchProductInCart(this.product.id);
              this.disabledButton();
            }
          })
        }
      }

    })

  }

  goBack(){
    this.location.back();
  }

  disabledButton(){
    const index = this.cart.findIndex(p => p.product.id === this.product.id)
    if (index != -1) {
      this.disabled = true;
    }
  }

  addToCart(product: Products){
    this.cartService.changeCart(product);
    this.quantity ++;
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
      if (index != -1) {
        this.cart = cart;
        this.quantity = cart[index].quantity;
        this.saveLocalStorage();
      }

    })
  }

  searchProductInCart(id: number){
    let index = this.cart.findIndex(cart => cart.product.id === id);
    if(index !== -1){
      this.quantity = this.cart[index].quantity;
    }
  }

  saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

}
