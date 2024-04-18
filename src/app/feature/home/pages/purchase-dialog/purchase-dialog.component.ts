import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CartRequestDto } from 'src/app/core/dto/cart/cartRequestDto';
import { CartResponseDto } from 'src/app/core/dto/cart/cartResponseDto';
import { CompraRequestDto } from 'src/app/core/dto/compra/compraRequestDto';
import { CartService } from 'src/app/core/service/cart.service';
import { CompraService } from 'src/app/core/service/compra.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { PurchaseDialogService } from 'src/app/core/service/purchase-dialog.service';
import { ProductoCartDto } from 'src/app/core/dto/produto/poductoCartDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { MatCardModule } from '@angular/material/card';
import { TokenService } from 'src/app/core/service/token.service';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-purchase-dialog',
	standalone: true,
	imports: [MatTableModule, MatCardModule, MatButtonModule],
	templateUrl: './purchase-dialog.component.html',
	styleUrl: './purchase-dialog.component.scss'
})
export class PurchaseDialogComponent implements OnInit {
	displayedColumns: String[] = ['Nombre', 'Cantidad', 'Precio Unitario', 'Total'];

	public compra: CompraRequestDto;
	public carrito: CartResponseDto;
	public listaCarrito: ProductoCartDto[];
	public cliente: AuthClientetDto;

	private readonly compraService: CompraService = inject(CompraService);
	private readonly purchaseDialogService: PurchaseDialogService = inject(PurchaseDialogService);
	private readonly cartService: CartService = inject(CartService);
	private readonly tokenService: TokenService = inject(TokenService);

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.compra = data.compra;
		this.carrito = data.cart;
		this.listaCarrito = data.cartList;
	}

	ngOnInit() {
		this.cliente = this.tokenService.getInfoToken();
	}

	public async buyAll(): Promise<void> {
		if (this.compra) {
			await lastValueFrom(this.compraService.save(this.compra))
				.then((response) => {
					if (response.id) {
						let cartRequest: CartRequestDto = new CartRequestDto();
						cartRequest.id = this.carrito.id;
						cartRequest.customerId = this.carrito.customerId;
						cartRequest.productos = this.listaCarrito
							.filter((p) => !p.checked)
							.map((p) => {
								delete p.selectedQuantity;
								delete p.checked;
								return p as ProductoResponseDto;
							});
						this.updateCart(cartRequest);
						Swal.fire({
							icon: 'success',
							title: `Compra con id de factura ${response.id} realizada correctamente`,
							showConfirmButton: true
						}).then(() => {
							this.purchaseDialogService.closeDialog();
						});
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
	}

	public async updateCart(cart: CartRequestDto): Promise<void> {
		await lastValueFrom(this.cartService.update(cart))
			.then((response) => {
				this.carrito = response;
				this.cartService.actualizarCarrito(response);
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
