import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit{

  @Input() cart: Cart[] = [];
  @Input() grandTotal: number = 0;
  product!: Cart;
  items: number = 0;

  constructor(private router: Router){}

  ngOnInit(){
    this.product = this.cart[0];
    this.items = this.cart.length - 1;
  }

  backToHome(){
    this.router.navigate(['']);
  }


}
