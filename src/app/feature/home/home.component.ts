import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartResponseDto } from 'src/app/core/dto/cart/cartResponseDto';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CartService } from 'src/app/core/service/cart.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public cliente: AuthClientetDto;
	public carrito: CartResponseDto;

	private readonly router: Router = inject(Router);
	private readonly activatedRouter: ActivatedRoute = inject(ActivatedRoute);
	private readonly tokenService: TokenService = inject(TokenService);
	private readonly cartService: CartService = inject(CartService);

	ngOnInit(): void {
		this.cliente = this.tokenService.getInfoToken();
		this.carrito = this.activatedRouter.snapshot.data['cart'];
		this.cartService.getCarrito().subscribe({
			next: (value) => {
				if (value) {
					this.carrito = value;
				}
			}
		});
	}

	public navigate(path: string): void {
		let completePath = `/home${path}`;
		this.router.navigate([completePath]);
	}

	closeSession() {
		this.tokenService.deleteToken();
		this.router.navigate(['/autenticacion/inicio-sesion']);
	}
}
