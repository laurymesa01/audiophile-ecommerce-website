import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Array<any>>([]);
  public currentDataCart$ = this.cart.asObservable();

  constructor() { }

  public changeCart(product: Products){
    let listCart = this.cart.getValue();
    let cantidad = 0;
    if(listCart && listCart.length > 0){
      let objIndex = listCart.findIndex((obj => obj.id == product.id));
      // listCart[objIndex].quantity = 0;
      Object.defineProperty(listCart[objIndex], "quantity", {
        value: 0
      });
      if(objIndex != -1){
        listCart[objIndex].quantity += 1;
      }
      else{
        listCart.push(product);
      }
    }
    else{
      listCart = [];
      listCart.push(product,);
    }
    this.cart.next(listCart);
  }

  public removeElements(){
    let listCart = this.cart.getValue();
    if(listCart.length > 0){
      listCart = [];
    }
    this.cart.next(listCart);
  }

  public removeElementCart(product: Products){
    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj => obj.id == product.id));
    if(objIndex != -1){
      listCart.splice(objIndex,1);
    }
    this.cart.next(listCart);
  }


}
