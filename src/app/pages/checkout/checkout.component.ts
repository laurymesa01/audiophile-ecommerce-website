import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { Products } from 'src/app/interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{


  cart: Cart[] = [];
  billModal: boolean = false;


  constructor(private location: Location,
              private cartService: CartService,
              private router: Router){}

  ngOnInit(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];

  }

  goBack(){
    this.location.back();
  }

  pay(){
    this.billModal = !this.billModal;
  }
}
