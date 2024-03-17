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
import { CataloguePaginatorComponent } from './pages/catalogue/catalogue-paginator/catalogue-paginator.component';


@NgModule({
  declarations: [
    HeaderNavComponent,
    HomeComponent,
    BuyWindowComponent,
    CatalogueComponent,
    CompraClienteComponent,
    VerCompraComponent,
    CataloguePaginatorComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
