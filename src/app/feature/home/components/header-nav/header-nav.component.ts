import { Component } from '@angular/core';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {
  public cliente:AuthClientetDto;
  constructor(private tokenService:TokenService){
    this.cliente = this.tokenService.getInfoToken(); 
  }
}
