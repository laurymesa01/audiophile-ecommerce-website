import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.url);
  }

  getProductsByCategory(title: string): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.url}?category_like=${title}`);
  }

  getProductById(id: string): Observable<Products>{
    return this.http.get<Products>(`${this.url}/${id}`);
  }

}
