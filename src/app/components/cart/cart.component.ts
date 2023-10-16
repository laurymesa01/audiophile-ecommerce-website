import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input() modal = false;

  constructor(private router: Router){}

  checkout(){
    this.router.navigate(['/', 'checkout'])
    this.modal = false
  }

}
