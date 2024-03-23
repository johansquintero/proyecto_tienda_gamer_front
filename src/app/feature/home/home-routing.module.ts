import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { BuyWindowComponent } from './pages/buy-window/buy-window.component';
import { CompraClienteComponent } from './pages/compra-cliente/compra-cliente.component';
import { VerCompraComponent } from './pages/ver-compra/ver-compra.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';

const routes: Routes = [
  //componente home y sus hijos
  {
    path: "", component: HomeComponent, children: [
      {
        path: "", component: CatalogueComponent
      },
      {
        path: "comprar", component: BuyWindowComponent
      },
      {
        path:"mis-compras",component:CompraClienteComponent
      },
      {
        path:"ver-compra",component:VerCompraComponent
      }
      ,
      {
        path:"ver-carrito",component:ShopingCartComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
