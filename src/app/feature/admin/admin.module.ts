import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminComponent } from './admin.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { FormTipoComponent } from './pages/tipo/form-tipo/form-tipo.component';
import { FormMarcaComponent } from './pages/marca/form-marca/form-marca.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './pages/producto/producto.component';
import { DetailProductoComponent } from './pages/producto/detail-producto/detail-producto.component';
import { FormProductoComponent } from './pages/producto/form-producto/form-producto.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchComponent } from '../search/search.component';
import { MarcaService } from 'src/app/core/service/marca.service';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SideNavbarComponent,
    AdminComponent,
    TipoComponent,
    FormTipoComponent,
    FormMarcaComponent,
    MarcaComponent,
    ProductoComponent,
    DetailProductoComponent,
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PaginatorComponent,
    SearchComponent, 
    NgbPaginationModule, 
    NgbTypeaheadModule
  ], providers: [
    MarcaService
  ]
})
export class AdminModule { }
