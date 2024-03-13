import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {
  public cliente: AuthClientetDto;
  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) {
    this.cliente = this.tokenService.getInfoToken();
  }

  public async signOut(): Promise<void> {
    await lastValueFrom(this.authService.signOut())
  }
}
