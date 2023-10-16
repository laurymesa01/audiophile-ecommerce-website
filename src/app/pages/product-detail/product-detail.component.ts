import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Products } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  product: Products = {
    id: 0,
    slug: '',
    name: '',
    image: {
      mobile: '',
      tablet: '',
      desktop: ''
    },
    category: '',
    categoryImage: {
      mobile: '',
      tablet: '',
      desktop: ''
    },
    new: false,
    price: 0,
    description: '',
    features: '',
    includes: [],
    gallery: {
      first: {
        mobile: '',
        tablet: '',
        desktop: ''
      },
      second: {
        mobile: '',
        tablet: '',
        desktop: ''
      },
      third: {
        mobile: '',
        tablet: '',
        desktop: ''
      }
    },
    others: []
  };

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({id}) => this.productService.getProductById(id)))
      .subscribe(product => {
        this.product = product

      })
  }

}
