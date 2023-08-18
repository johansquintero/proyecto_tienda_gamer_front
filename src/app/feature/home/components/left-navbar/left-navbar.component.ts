import { Component } from '@angular/core';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent {
  public cliente:AuthClientetDto;
  constructor(private tokenService:TokenService){
    this.cliente = tokenService.getInfoToken();
  }
}
