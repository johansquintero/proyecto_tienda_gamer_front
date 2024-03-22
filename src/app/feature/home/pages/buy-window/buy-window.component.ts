import { CompraRequestDto } from './../../../../core/dto/compra/compraRequestDto';
import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraProductoRequestDto } from 'src/app/core/dto/compraproducto/compraProductoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { CompraService } from 'src/app/core/service/compra.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { TokenService } from 'src/app/core/service/token.service';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-window',
  templateUrl: './buy-window.component.html',
  styleUrls: ['./buy-window.component.css']
})
export class BuyWindowComponent {
  producto: ProductoResponseDto;
  quantity: FormControl;
  cliente: AuthClientetDto;
  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private compraService: CompraService) {
    this.quantity = new FormControl(1, [CustomValidators.NumericValidator]);
    this.cliente = this.tokenService.getInfoToken()
  }

  ngOnInit() {
    this.getProducto();
  }

  public async getProducto() {
    let name = '';
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      name = params['producto_name'] ? params['producto_name'] : '';
    });
    await lastValueFrom(this.productoService.getProductoByName(name)).then(response => {
      this.producto = response;
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      }).then(value => {
        this.router.navigate(['home']);
      });;
    });
  }

  public async buy(): Promise<void> {
    let compraProductoRequestDto: CompraProductoRequestDto = new CompraProductoRequestDto();
    compraProductoRequestDto.quantity = this.quantity.value as number;
    compraProductoRequestDto.productId = this.producto.id;
    compraProductoRequestDto.total = this.producto.price * this.quantity.value;

    let compraRequestDto: CompraRequestDto = new CompraRequestDto();
    compraRequestDto.date = this.getActualDateFormatted();
    compraRequestDto.customerId = this.cliente.id
    compraRequestDto.paymentMethod = "debito";
    compraRequestDto.compraProductos.push(compraProductoRequestDto);
    compraRequestDto.compraProductos.forEach(compraProductoRequestDto => {
      compraRequestDto.total += compraProductoRequestDto.total
    });
    console.log(compraRequestDto);

    await lastValueFrom(this.compraService.save(compraRequestDto)).then(response => {
      if (response.id) {
        Swal.fire({
          icon: 'success',
          title: `Compra con id de factura ${response.id} realizada correctamente`,
          showConfirmButton: true
        });
        this.getProducto();
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      })
    })
  }

  /**
   * Genera el el numero total de cantidades del producto para el select
   * @returns 
   */
  generateQuantities(): number[] {
    let numbers: number[] = []
    for (let index = 1; index <= this.producto.quantity; index++) {
      numbers.push(index)
    }
    return numbers;
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
