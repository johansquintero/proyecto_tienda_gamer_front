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
import { SearchComponent } from '../components/search/search.component';
import { MarcaService } from 'src/app/core/service/marca.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list'

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
		SearchComponent,
		MatSidenavModule,
		MatPaginatorModule,
		MatTableModule,
		MatListModule,
		MatMenuModule,
		MatButtonModule,
		MatDividerModule,
		MatTreeModule,
		MatIconModule,
		MatFormFieldModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatGridListModule
	],
	providers: [MarcaService]
})
export class AdminModule {}
