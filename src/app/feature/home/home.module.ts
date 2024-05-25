import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { CompraClienteComponent } from './pages/compras-cliente/compras-cliente.component';
import { VerCompraComponent } from './pages/ver-compra/ver-compra.component';
import { SearchComponent } from '../components/search/search.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [HomeComponent, ItemDetailComponent, CatalogueComponent, CompraClienteComponent, VerCompraComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		SearchComponent,
		ShopingCartComponent,
		NgbPaginationModule,
		NgbTypeaheadModule,
		MatToolbarModule,
		MatIcon,
		MatButtonModule,
		MatBadgeModule,
		MatSidenavModule,
		MatCardModule,
		MatPaginatorModule,
		MatMenuModule,
		MatListModule,
		MatTableModule
	]
})
export class HomeModule {}
