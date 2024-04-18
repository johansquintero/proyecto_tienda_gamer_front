import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public cliente: AuthClientetDto;

	private readonly router: Router = inject(Router);
	private readonly tokenService: TokenService = inject(TokenService);

	ngOnInit(): void {
		this.cliente = this.tokenService.getInfoToken();
	}

	public navigate(path: string): void {
    let completePath = `/home${path}`
		this.router.navigate([completePath]);
	}

	closeSession() {
		this.tokenService.deleteToken();
    this.router.navigate(['/autenticacion/inicio-sesion'])
	}
}
