import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CartRequestDto } from 'src/app/core/dto/cart/cartRequestDto';
import { CartResponseDto } from 'src/app/core/dto/cart/cartResponseDto';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraRequestDto } from 'src/app/core/dto/compra/compraRequestDto';
import { CompraProductoRequestDto } from 'src/app/core/dto/compraproducto/compraProductoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { CartService } from 'src/app/core/service/cart.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';
import { MatListModule } from '@angular/material/list';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PurchaseDialogService } from 'src/app/core/service/purchase-dialog.service';
import { ProductoCartDto } from 'src/app/core/dto/produto/poductoCartDto';

@Component({
	selector: 'app-shoping-cart',
	standalone: true,
	imports: [CommonModule, MatListModule, MatButtonModule, MatCardModule],
	templateUrl: './shoping-cart.component.html',
	styleUrl: './shoping-cart.component.scss'
})
export class ShopingCartComponent implements OnInit {
	public listaCarrito: ProductoCartDto[];
	public cliente: AuthClientetDto;
	public carrito: CartResponseDto;

	//injeccion de dependencias por readonly e inject
	private readonly router: Router = inject(Router);
	private readonly cartService: CartService = inject(CartService);
	private readonly tokenService: TokenService = inject(TokenService);
	private readonly pruchaseDialog: PurchaseDialogService = inject(PurchaseDialogService);

	ngOnInit(): void {
		this.cliente = this.tokenService.getInfoToken();
		if (this.cliente) {
			this.GetCart(this.cliente.id);
		}
		//observable del carrito cuando se actualice
		this.cartService.getCarrito().subscribe({
			next: (value) => {
				if (value) {
					this.carrito = value;
					this.listaCarrito = this.carrito.productos.map((p) => {
						return { ...p, selectedQuantity: 1, checked: true } as ProductoCartDto; //se le asigna el atributo de la cantidad seleccionada
					});
				}
			}
		});
	}

	public async GetCart(customerId: number): Promise<void> {
		this.cartService.getByUserId(customerId).subscribe({
			next: (value) => {
				this.carrito = value;
				this.listaCarrito = this.carrito.productos.map((p) => {
					//se le asigna el atributo de la cantidad seleccionada
					return { ...p, selectedQuantity: 1, checked: true } as ProductoCartDto; 
				});
			},
			error: (error) => {
				console.log(error);
			}
		});
		/*
    await lastValueFrom(this.cartService.getByUserId(customerId)).then(response => {
      this.carrito = response;
      this.listaCarrito = this.carrito.productos.map(p => {
        return { ...p, selectedQuantity: 1, checked: true }//se le asigna el atributo de la cantidad seleccionada
      });
    })*/
	}
	//generacion del detalle de la compra paa finalmente abrir el modal o dialog de compra
	public generateDetail() {
		if (this.listaCarrito.length > 0) {
			//se filtran los producto que esten checkeados
			let selectedProducts = this.listaCarrito.filter((p) => p.checked);
			let detail = selectedProducts.map((p) => {
				let compraProductoRequestDto: CompraProductoRequestDto = new CompraProductoRequestDto();
				compraProductoRequestDto.quantity = p.selectedQuantity;
				compraProductoRequestDto.productId = p.id;
				compraProductoRequestDto.total = p.price * p.selectedQuantity;
				compraProductoRequestDto.productName = p.name
				return compraProductoRequestDto;
			});

			let compraRequestDto: CompraRequestDto = new CompraRequestDto();
			compraRequestDto.date = this.getActualDateFormatted();
			compraRequestDto.customerId = this.cliente.id;
			compraRequestDto.paymentMethod = 'debito';
			compraRequestDto.compraProductos = detail;
			compraRequestDto.compraProductos.forEach((compraProductoRequestDto) => {
				compraRequestDto.total += compraProductoRequestDto.total;
			});
			//se abre el dialog enviado datos como el detalle, el carrito y la lista de carrito actualizada
			this.pruchaseDialog.openDialog(compraRequestDto, this.carrito, this.listaCarrito);
		}
	}

	public async updateCart(cart: CartRequestDto): Promise<void> {
		await lastValueFrom(this.cartService.update(cart))
			.then((response) => {
				this.carrito = response;
				this.listaCarrito = this.carrito.productos.map((p) => {
					//se le anade de nuevo el atributo dado que se actualiza de nuevo la lista
					return { ...p, selectedQuantity: 1, checked: true } as ProductoCartDto;
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: err.error.detail
				});
			});
	}
	public deleteFromCart(producto: any) {
		this.listaCarrito = this.listaCarrito.filter((p: ProductoResponseDto) => p.id != producto.id);
		var cartRequest: CartRequestDto = new CartRequestDto();
		cartRequest.customerId = this.carrito.customerId;
		cartRequest.productos = this.listaCarrito.map((p) => {
			delete p.selectedQuantity;
			delete p.checked;
			return p;
		});
		cartRequest.id = this.carrito.id;
		this.updateCart(cartRequest);
	}

	public updateQuantity(quantity: string, productoId: number) {
		this.listaCarrito.forEach((e) => {
			if (e.id == productoId) {
				e.selectedQuantity = parseInt(quantity);
			}
		});
	}

	/**
	 * funcion que captura el evento de seleccion del check box de un producto
	 * @param event
	 * @param productoId
	 */
	public updateChecked(event: any, productoId: number) {
		this.listaCarrito.forEach((p) => {
			if (p.id == productoId) {
				p.checked = event.target.checked;
				console.log(p);
			}
		});
	}
	/**
	 * Genera el el numero total de cantidades del producto para el select
	 * @returns
	 */
	generateQuantities(n: number): number[] {
		let numbers: number[] = [];
		if (n > 50) {
			for (let index = 1; index <= 50; index++) {
				numbers.push(index);
			}
		} else {
			for (let index = 1; index <= n; index++) {
				numbers.push(index);
			}
		}
		return numbers;
	}

	public goBuy(id: number) {
		this.router.navigate(['/home/comprar'], {
			queryParams: { producto_id: id }
		});
	}

	/**
	 * Formatea la fecha actual y lo retorna en un string
	 * @returns
	 */
	getActualDateFormatted(): string {
		// Obtén la fecha y hora actual
		let fechaHoraActual = new Date();
		// Obtén los componentes individuales
		let año = fechaHoraActual.getFullYear();
		let mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque los meses comienzan desde 0.
		let dia = fechaHoraActual.getDate().toString().padStart(2, '0');
		let hora = fechaHoraActual.getHours().toString().padStart(2, '0');
		let minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
		let segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
		let milisegundos = fechaHoraActual.getMilliseconds().toString().padStart(3, '0');

		// Formatea la fecha y hora en el formato deseado
		let fechaHoraFormateada = `${año}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milisegundos}`;
		return fechaHoraFormateada;
	}
	public volverPaginaAnterior() {
		window.history.back();
	}
}
