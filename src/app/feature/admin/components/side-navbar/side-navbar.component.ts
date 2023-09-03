import { Component } from '@angular/core';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  public cliente: AuthClientetDto;
  constructor(private tokenService: TokenService) {
    this.cliente = tokenService.getInfoToken();
  }
  
}
