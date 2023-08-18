import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { RegisterProductoComponent } from './pages/producto/register-producto/register-producto.component';
import { HomeComponent } from './home.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { FormMarcaComponent } from './pages/marca/form-marca/form-marca.component';
import { FormTipoComponent } from './pages/tipo/form-tipo/form-tipo.component';

const routes: Routes = [
  //componente home y sus hijos
  {
    path: "", component: HomeComponent, children: [

      //componentes para el producto
      {
        path: "", component: ProductoComponent
      },
      {
        path: "registro-producto", component: RegisterProductoComponent
      },

      //componentes para marca
      {
        path: "marca", component: MarcaComponent
      },
      {
        path: "marca-form", component: FormMarcaComponent
      },

      //componentes para tipo
      {
        path: "tipo", component: TipoComponent
      },
      {
        path: "tipo-form", component: FormTipoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
