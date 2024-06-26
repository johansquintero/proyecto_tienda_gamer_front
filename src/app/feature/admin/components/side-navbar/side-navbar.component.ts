import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  public cliente: AuthClientetDto;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.cliente = this.tokenService.getInfoToken();
  }

  public async signOut(): Promise<void> {
    await lastValueFrom(this.authService.signOut());
  }
}
