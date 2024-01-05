import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  products: Products[] = [];
  category: string = '';

  Breakpoints = Breakpoints;
  readonly breakpoint$ = this.breakpointObserver
    .observe(['(min-width: 1024px)'])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private breakpointObserver: BreakpointObserver
              ){

              }

  ngOnInit(){
    this.breakpoint$.subscribe(() =>
    this.Style && this.Style2
    );

    this.activatedRoute.params
      .pipe(switchMap(({category}) => this.productService.getProductsByCategory(category)))
      .subscribe(products => {
        this.products = products
        this.category = this.products[0].category;
        console.log(this.products);
      })
  }

  public get Style(){
    let style = {};
    if (this.breakpointObserver.isMatched('(min-width: 1024px)')) {
      style = {
        'grid-column-start': 1,
        'grid-row-start': 1,
        'margin-right': '3.5rem'
      }
    }
    return style;
  }

  public get Style2(){
    let style = {};
    if (this.breakpointObserver.isMatched('(min-width: 1024px)')) {
      style = {
        'grid-column-start': 2,
        'grid-row-start': 1,
      }
    }
    return style;
  }

}
