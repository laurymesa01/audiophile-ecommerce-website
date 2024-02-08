import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { Products } from 'src/app/interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  @Output() sendCart = new EventEmitter<Cart[]>();
  @Output() sendGrandTotal = new EventEmitter<number>();


  cart: Cart[] = [];
  billModal: boolean = false;
  total: number = 0;
  shipping: number = 50;
  vat: number = 0;
  grandTotal: number = 0;
  detailsFormGroup: FormGroup = this._formBuilder.group({
    name: new FormControl(" ", [Validators.required, ]),
    email: new FormControl(" ", [Validators.required, Validators.email]),
    phone: new FormControl(" ", Validators.required),
    address: new FormControl(" ", Validators.required),
    zip: new FormControl(" ", Validators.required),
    city: new FormControl(" ", Validators.required),
    country: new FormControl(" ", Validators.required),

  })


  constructor(private location: Location,
              private _formBuilder: FormBuilder,){}

  ngOnInit(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];
    this.getTotal()
  }

  goBack(){
    this.location.back();
  }

  pay(){
    if(this.detailsFormGroup.valid){
      // this.sendCart.emit(this.cart);
      // this.sendGrandTotal.emit(this.grandTotal);
      this.billModal = !this.billModal;
    }
  }

  getTotal(){
    this.total = Number(localStorage.getItem('totalPrice'));
    this.vat = this.total / 5;
    this.grandTotal = this.total + this.shipping + this.vat;
  }
}
