import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Products } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  @Input() modal = false;

  public products: Array<Products> = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  quantity: number = 0;
  public totalPrice:number = 0;
  public totalQuantity:number = 0;

  constructor(private router: Router,
              private cartService: CartService){}

  ngOnInit(){
    this.cartService.currentDataCart$.subscribe(products => {
      if(products && products.length > 0){
        this.products = products;
        this.totalQuantity = products.length;
        this.totalPrice = products.reduce((sum, current) => sum + (current.price), 0);
        this.saveLocalStorage();
      }
    })
  }

  public remove(){
    this.cartService.removeElements();
    this.products = [];
    localStorage.removeItem('cart');
  }

  checkout(){
    this.router.navigate(['checkout']);
    this.modal = false;
    this.cartService.senCartToCheckout(this.products);
  }

  saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(this.products));
  }

  increaseProduct(quantity: number){
    // let product = this.products.find(product => product.id == id);
    quantity ++;
    this.quantity = quantity;

  }

  decreaseProduct(quantity: number){
    quantity --;
    this.quantity = quantity;

  }
}
