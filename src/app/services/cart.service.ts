import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private myShopingCart: Products[] = [];
  private cart = new BehaviorSubject<Array<Products>>([]);
  public currentDataCart$ = this.cart.asObservable();
  total = 0;

  constructor() { }

  // public changeCart(product: Products){
  //   this.myShopingCart = this.cart.getValue();
  //   if(this.myShopingCart && this.myShopingCart.length > 0){
  //     let objIndex = this.myShopingCart.findIndex((obj => obj.id == product.id));
  //     listCart[objIndex].quantity = 0;
  //     Object.defineProperty(this.myShopingCart[objIndex], "quantity", {
  //       value: 0
  //     });
  //     if(objIndex != -1){
  //       listCart[objIndex].quantity += 1;
  //     }
  //       listCart.push(product);
  //   }
  //   else{
  //     listCart = [];
  //     listCart.push(product,);
  //   }
  //   this.cart.next(listCart);
  // }

  public changeCart(product: Products){
    this.myShopingCart.push(product);
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
    let objIndex = listCart.findIndex((obj => obj.id == product.id));
    if(objIndex != -1){
      listCart.splice(objIndex,1);
    }
    this.cart.next(listCart);
  }

  getTotal() {
    return (this.total = this.myShopingCart.reduce(
      (sum, item) => sum + item.price,
      0
    ));
  }


}
