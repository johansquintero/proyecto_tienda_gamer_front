import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoComponent } from './pages/tipo/tipo.component';
import { FormTipoComponent } from './pages/tipo/form-tipo/form-tipo.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { FormMarcaComponent } from './pages/marca/form-marca/form-marca.component';
import { AdminComponent } from './admin.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FormProductoComponent } from './pages/producto/form-producto/form-producto.component';
import { DetailProductoComponent } from './pages/producto/detail-producto/detail-producto.component';
import { branchResolver, productsResolver, typeResolver } from 'src/app/core/resolver/allresolvers.resolver';

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      {
        path: "", component: ProductoComponent,resolve:{paginator:productsResolver},title:"Admin"
      },
      {
        path: "producto-form", component: FormProductoComponent,title:"Formulario de producto"
      },
      {
        path: "producto-detail", component: DetailProductoComponent, title:"Detalle de del producto"
      },

      {
        path: "tipo-form", component: FormTipoComponent,title:"Formulario de tipo"
      },
      {
        path: "tipo", component: TipoComponent,title:"Ver tipos",resolve:{paginator:typeResolver}
      },
      {
        path: "marca", component: MarcaComponent,title:"Ver marcas",resolve:{paginator:branchResolver}
      },
      {
        path: "marca-form", component: FormMarcaComponent,title:"Formulario de marca"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
