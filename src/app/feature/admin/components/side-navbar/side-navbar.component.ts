import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  public cliente: AuthClientetDto;
  constructor(private tokenService: TokenService, private authService: AuthService) {
    this.cliente = this.tokenService.getInfoToken();
  }

  public async signOut(): Promise<void> {
    await lastValueFrom(this.authService.signOut())
  }
  
}
