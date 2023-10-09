import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  products: Products[] = [];
  category = ''

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService){

              }

  ngOnInit(){
    this.category = this.router.url.slice(1);
    this.productService.getProductsByCategory(this.category).subscribe(products => {
      this.products = products;
      console.log(this.products);
    })
  }

}
