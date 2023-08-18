import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { RegisterProductoComponent } from './pages/producto/register-producto/register-producto.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MarcaComponent } from './pages/marca/marca.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { FormMarcaComponent } from './pages/marca/form-marca/form-marca.component';
import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';
import { FormTipoComponent } from './pages/tipo/form-tipo/form-tipo.component';


@NgModule({
  declarations: [
    ProductoComponent,
    HeaderNavComponent,
    RegisterProductoComponent,
    HomeComponent,
    MarcaComponent,
    TipoComponent,
    FormMarcaComponent,
    LeftNavbarComponent,
    FormTipoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
