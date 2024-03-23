import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyWindowComponent } from './pages/buy-window/buy-window.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { CompraClienteComponent } from './pages/compra-cliente/compra-cliente.component';
import { VerCompraComponent } from './pages/ver-compra/ver-compra.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchComponent } from '../search/search.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';


@NgModule({
  declarations: [
    HeaderNavComponent,
    HomeComponent,
    BuyWindowComponent,
    CatalogueComponent,
    CompraClienteComponent,
    VerCompraComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    PaginatorComponent,
    SearchComponent,
    ShopingCartComponent
  ]
})
export class HomeModule { }
