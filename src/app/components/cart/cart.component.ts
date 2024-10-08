import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Products } from 'src/app/interfaces/product.interface';
import { Cart } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  @Input() modal = false;
  @Output() onCheckout = new EventEmitter<boolean>();

  public cart         : Array<Cart> = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  public totalPrice   : number = Number(localStorage.getItem('totalPrice'));
  public totalQuantity: number = Number(localStorage.getItem('totalQuantity'));
  buttonDisabled: boolean = false;

  constructor(private router: Router,
              private cartService: CartService){}

  ngOnInit(){
    this.cartService.currentDataCart$.subscribe(products => {
      if(products && products.length > 0){
        products.forEach(cart => {
          let newTitle = this.fixTitleProduct(cart.product);
          cart.product.name = newTitle;
        });
        this.cart = products;
        this.totalQuantity = products.reduce((sum, current) => sum + (current.quantity), 0);
        this.totalPrice = products.reduce((sum, current) => sum + (current.product.price * current.quantity), 0);
        this.saveLocalStorage();
      }
      // else{
      //   console.log(this.cart);
      //   this.cart.forEach(cart => {
      //     let newTitle = this.fixTitleProduct(cart.product);
      //     cart.product.name = newTitle;
      //   });
      // }
    });
  }

  fixTitleProduct(product: Products){
    let name = product.name;
    let words = name.split(' ');
    if (words.length > 2) {
      words.pop();
    }
    let newTitle = words.join(' ');
    return newTitle;
  }

  public remove(){
    this.cartService.removeElements();
    this.cart = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantity');
  }

  checkout(){
    this.onCheckout.emit(true);
    this.modal = false;
  }

  saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("totalPrice", this.totalPrice.toString());
    localStorage.setItem("totalQuantity", this.totalQuantity.toString());
  }

  increaseProduct(product: Products){
    this.cartService.increaseProduct(product);
    this.cartService.currentDataCart$.subscribe(cart => {
      this.cart = cart;
      this.saveLocalStorage();

    })
  }

  decreaseProduct(product: Products){
    this.cartService.decreaseProduct(product);
    this.cartService.currentDataCart$.subscribe(cart => {
      this.cart = cart;
      if (this.cart.length === 0) {
        this.totalPrice = 0;
        this.totalQuantity = 0;
      }
      this.saveLocalStorage();
    })

  }
}
