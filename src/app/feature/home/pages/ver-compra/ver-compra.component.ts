import { CompraResponseDto } from './../../../../core/dto/compra/compraResponseDto';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraService } from 'src/app/core/service/compra.service';
import { TokenService } from 'src/app/core/service/token.service';
import { goBack } from 'src/app/core/utils/AppBaseComponent';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-ver-compra',
	templateUrl: './ver-compra.component.html',
	styleUrls: ['./ver-compra.component.scss']
})
export class VerCompraComponent{
	compra: CompraResponseDto;
	cliente: AuthClientetDto;
	displayedColumns: String[] = ['Nombre', 'Cantidad', 'Precio Unitario', 'Total'];
	goBack = goBack;

	constructor(private compraService: CompraService, private tokenService: TokenService, private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.cliente = this.tokenService.getInfoToken();
		this.getCompra();
	}

	public async getCompra(): Promise<void> {
		let compraId = 0;
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			compraId = params['compra_id'] ? params['compra_id'] : 0;
		});
		await lastValueFrom(this.compraService.getCompraById(compraId))
			.then((response) => {
				this.compra = response;
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: err.error.detail
				});
			});
	}
}
