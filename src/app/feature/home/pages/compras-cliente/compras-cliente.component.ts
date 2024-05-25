import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { Component } from '@angular/core';
import { CompraResponseDto } from 'src/app/core/dto/compra/compraResponseDto';
import { CompraService } from 'src/app/core/service/compra.service';
import { TokenService } from 'src/app/core/service/token.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-compras-cliente',
	templateUrl: './compras-cliente.component.html',
	styleUrls: ['./compras-cliente.component.scss']
})
export class CompraClienteComponent {
	public compras: CompraResponseDto[];
	public paginator: any;
	page: number = 0;
	pageSize: number;
	collectionSize: number;
	cliente: AuthClientetDto;

	displayedColumns:String[] = ['Id','Date', 'PaymentMethod', 'Total']

	constructor(
		private compraService: CompraService,
		private tokenService: TokenService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		//carga de datos por resolve
		this.paginator = this.activatedRoute.snapshot.data['paginator'];
		this.collectionSize = parseInt(this.paginator.totalElements);
		this.pageSize = parseInt(this.paginator.numberOfElements);
		this.page = parseInt(this.paginator.number);
		this.compras = this.paginator.content as CompraResponseDto[];
		this.cliente = this.tokenService.getInfoToken();
	}

	public async getComprasUsuarioPage(page: number): Promise<void> {
		await lastValueFrom(this.compraService.getCompraByClientePage(this.cliente.id, page))
			.then((response) => {
				let c = response.content as CompraResponseDto[];
				if (c.length > 0 && c[0].customerId == this.cliente.id) {
					this.compras = c;
					this.paginator = response;
					this.page = parseInt(this.paginator.number);
				}
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: err.error.detail
				});
			});
	}

	public async getComprasUsuario(): Promise<void> {
		let cliente: AuthClientetDto = this.tokenService.getInfoToken();
		await lastValueFrom(this.compraService.getCompraByCliente(cliente.id))
			.then((response) => {
				if (response.length > 0 && response[0].customerId == cliente.id) {
					this.compras = response;
				}
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: err.error.detail
				});
			});
	}

	public verFactura(compraId: Number): void {
		this.router.navigate(['/home/ver-compra'], { queryParams: { compra_id: compraId } });
	}
	public back() {
		history.back();
	}
}
