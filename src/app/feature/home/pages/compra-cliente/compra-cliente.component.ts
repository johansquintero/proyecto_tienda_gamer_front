import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { Component } from '@angular/core';
import { CompraResponseDto } from 'src/app/core/dto/compra/compraResponseDto';
import { CompraService } from 'src/app/core/service/compra.service';
import { TokenService } from 'src/app/core/service/token.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-cliente',
  templateUrl: './compra-cliente.component.html',
  styleUrls: ['./compra-cliente.component.css']
})
export class CompraClienteComponent {

  public compras: CompraResponseDto[];

  constructor(
    private compraService: CompraService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(){
    this.getComprasUsuario();
  }
  public async getComprasUsuario():Promise<void> {
    let cliente: AuthClientetDto = this.tokenService.getInfoToken();
    await lastValueFrom(this.compraService.getCompraByCliente(cliente.id)).then(response => {
      if (response.length > 0 && response[0].customerId == cliente.id) {
        this.compras = response;
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      });
    });
  }

  public verFactura(compraId:Number):void{
    this.router.navigate(["/home/ver-compra"],{queryParams:{compra_id:compraId}})
  }
  public volverPaginaAnterior() {
    window.history.back();
  }
}
