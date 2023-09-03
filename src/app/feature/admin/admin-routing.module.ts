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

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      {
        path: "", component: ProductoComponent
      },
      {
        path: "producto-form", component: FormProductoComponent
      },
      {
        path: "producto-detail", component: DetailProductoComponent
      },

      {
        path: "tipo-form", component: FormTipoComponent
      },
      {
        path: "tipo", component: TipoComponent
      },
      {
        path: "marca", component: MarcaComponent
      },
      {
        path: "marca-form", component: FormMarcaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
