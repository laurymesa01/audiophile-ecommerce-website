import { Component, Input, OnInit } from '@angular/core';
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
  public products: Array<Products> = [];
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
        console.log('products',this.products);
        console.log('quantity',this.totalQuantity);
        console.log('price',this.totalPrice);
      }
    })
  }

  public remove(){
    this.cartService.removeElements();
    this.products = [];
  }

  checkout(){
    this.router.navigate(['checkout'])
    this.modal = false
  }

}
