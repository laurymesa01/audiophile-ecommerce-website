import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private location: Location){}

  goBack(){
    this.location.back();
  }
}
