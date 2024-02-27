import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Products } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  modal           :boolean  = false;

  constructor(private productService: ProductService){}

  getProductByName(){}

  openCart(){
    this.modal = true;
    // this.style = {
    //   'visibility': 'hidden'
    // }
  }


}
