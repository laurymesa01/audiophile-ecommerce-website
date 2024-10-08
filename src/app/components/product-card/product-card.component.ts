import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  @Input() product!: Products;

  ngOnInit(){}
}
