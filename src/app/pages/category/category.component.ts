import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  products: Products[] = [];
  category: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService){

              }

  ngOnInit(){
    this.activatedRoute.params
      .pipe(switchMap(({category}) => this.productService.getProductsByCategory(category)))
      .subscribe(products => {
        this.products = products
        console.log(this.products);

      })
  }

}
