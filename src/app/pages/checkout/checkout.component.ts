import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import { Products } from 'src/app/interfaces/product.interface';
import { Cart } from 'src/app/interfaces/cart.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


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
  checkbox1:boolean = true;
  checkbox2:boolean = false;
  style1 = {};
  style2 = {};
  // '/^\(\d{3}\) \d{3}-\d{4}$/')]
  detailsFormGroup: FormGroup = this._formBuilder.group({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.pattern('^[- +()0-9]+$')]),
    address: new FormControl("", [Validators.required, Validators.minLength(3)]),
    zip: new FormControl("", [Validators.required, Validators.minLength(3)]),
    city: new FormControl("", [Validators.required, Validators.minLength(3)]),
    country: new FormControl("",[Validators.required, Validators.minLength(3)]),
    eNumber: new FormControl(""),
    ePin: new FormControl("")
  })


  constructor(private location: Location,
              private _formBuilder: FormBuilder,){}

  ngOnInit(){
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];
    this.cart.forEach(cart => {
      let newTitle = this.fixTitleProduct(cart.product);
      cart.product.name = newTitle;
    })
    this.getTotal();
    this.style1 = {
      'border': '1px solid #D87D4A'
    }
    this.style2 = {
      'border': '1px solid #CFCFCF'
    }
  }

  goBack(){
    this.location.back();
  }

  fixTitleProduct(product: Products){
    let name = product.name;
    let words = name.split(' ');
    words.pop();
    let newTitle = words.join(' ');
    return newTitle;
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

  changePaymentMethod(){
    this.checkbox1 = !this.checkbox1;
    this.checkbox2 = !this.checkbox2;
    let style = this.style1;
    this.style1 = this.style2;
    this.style2 = style;
  }
}
