import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { CompraClienteComponent } from './pages/compras-cliente/compras-cliente.component';
import { VerCompraComponent } from './pages/ver-compra/ver-compra.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { cartResolver } from 'src/app/core/resolver/cart.resolver';
import { buyResolver, productsResolver } from 'src/app/core/resolver/allresolvers.resolver';

const routes: Routes = [
  //componente home y sus hijos
  {
    path: "", component: HomeComponent, children: [
      {
        path: "", component: CatalogueComponent,title:"Catalogo de productos",resolve:{paginator:productsResolver,cart:cartResolver}
      },
      {
        path: "comprar", component: ItemDetailComponent,resolve:{cart:cartResolver},title:"Comprar producto"
      },
      {
        path:"mis-compras",component:CompraClienteComponent,title:"Mis compras",resolve:{paginator:buyResolver}
      },
      {
        path:"ver-compra",component:VerCompraComponent,title:"Factura"
      }
      ,
      {
        path:"ver-carrito",component:ShopingCartComponent,title:"Carrito"
      },/*
      { carga perezosa a componentes stanalone
        path:"ruta",loadComponent:()=> import("ruta del componente").then(m=>m.component)
      }*/
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
