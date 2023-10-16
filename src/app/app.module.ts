import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AudiophileComponent } from './components/audiophile/audiophile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CardsComponent } from './components/cards/cards.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    ProductCardComponent,
    AudiophileComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    CardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
