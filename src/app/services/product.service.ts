import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'https://json-server-audiophile.vercel.app';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.url}/products`);
  }

  getProductsByCategory(title: string): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.url}/products?category_like=${title}`);
  }

  getProductById(id: string): Observable<Products>{
    return this.http.get<Products>(`${this.url}/products/${id}`);
  }

  getProductBySlug(slug: string): Observable<Products[]>{
    const params = new HttpParams().set('slug', slug);
    return this.http.get<Products[]>(`${this.url}/products`, { params });
  }

}
