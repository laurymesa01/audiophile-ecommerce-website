import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Products } from '../interfaces/product.interface';
import { Cart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private myShopingCart: Cart[] = [];
  private cart = new BehaviorSubject<Array<Cart>>([]);
  public currentDataCart$ = this.cart.asObservable();
  total = 0;

  constructor() { }

  public changeCart(product: Products){
    let index = this.myShopingCart.findIndex(cart => cart.product.id === product.id);
    if(index === -1){
      const newProduct: Cart = {
        product: product,
        quantity: 1
      }
      this.myShopingCart.push(newProduct);
    }
    else{
      this.myShopingCart[index].quantity ++;
    }
    this.cart.next(this.myShopingCart);
  }

  public removeElements(){
    this.myShopingCart = this.cart.getValue();
    // let listCart = this.cart.getValue();
    if(this.myShopingCart.length > 0){
      this.myShopingCart = [];
    }
    this.cart.next(this.myShopingCart);
  }

  public removeElementCart(product: Products){
    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj => obj.product.id == product.id));
    if(objIndex != -1){
      listCart.splice(objIndex,1);
    }
    this.cart.next(listCart);
  }

  getTotal() {
    return (this.total = this.myShopingCart.reduce(
      (sum, item) => sum + item.product.price,
      0
    ));
  }
}
