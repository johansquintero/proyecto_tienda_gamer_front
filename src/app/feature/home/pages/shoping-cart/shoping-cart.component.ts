import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraRequestDto } from 'src/app/core/dto/compra/compraRequestDto';
import { CompraProductoRequestDto } from 'src/app/core/dto/compraproducto/compraProductoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { CompraService } from 'src/app/core/service/compra.service';
import { TokenService } from 'src/app/core/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoping-cart.component.html',
  styleUrl: './shoping-cart.component.css'
})
export class ShopingCartComponent {

  public listaCarrito: any[]
  public cliente: AuthClientetDto;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private compraService: CompraService) { }

  ngOnInit() {
    this.cliente = this.tokenService.getInfoToken()
    if (localStorage.getItem('carrito')) {
      let l: ProductoResponseDto[] = JSON.parse(localStorage.getItem('carrito')) as ProductoResponseDto[]
      this.listaCarrito = l.map(p => {
        let x = { ...p, selectedQuantity: 1 }
        return x
      });
    } else {
      this.listaCarrito = []
      localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
    }
  }

  public async buyAll(): Promise<void> {
    if (this.listaCarrito.length > 1) {
      let detail: CompraProductoRequestDto[] = this.listaCarrito.map(p => {
        let compraProductoRequestDto: CompraProductoRequestDto = new CompraProductoRequestDto();
        compraProductoRequestDto.quantity = p.selectedQuantity;
        compraProductoRequestDto.productId = p.id;
        compraProductoRequestDto.total = p.price * p.selectedQuantity;
        return compraProductoRequestDto
      });

      let compraRequestDto: CompraRequestDto = new CompraRequestDto();
      compraRequestDto.date = this.getActualDateFormatted();
      compraRequestDto.customerId = this.cliente.id
      compraRequestDto.paymentMethod = "debito";
      compraRequestDto.compraProductos = detail;
      compraRequestDto.compraProductos.forEach(compraProductoRequestDto => {
        compraRequestDto.total += compraProductoRequestDto.total
      });
      await lastValueFrom(this.compraService.save(compraRequestDto)).then(response => {
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `Compra con id de factura ${response.id} realizada correctamente`,
            showConfirmButton: true
          });
          this.listaCarrito = []
          localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        })
      })
    }
  }

  public updateQuantity(quantity: string, productoId: number) {
    this.listaCarrito.forEach(e => {
      if (e.id == productoId) {
        e.selectedQuantity = parseInt(quantity)
      }
    })
  }
  /**
  * Genera el el numero total de cantidades del producto para el select
  * @returns 
  */
  generateQuantities(n: number): number[] {
    let numbers: number[] = []
    for (let index = 1; index <= n; index++) {
      numbers.push(index)
    }
    return numbers;
  }

  public deleteFromCart(producto: any) {
    this.listaCarrito = this.listaCarrito.filter((p: ProductoResponseDto) => p.id != producto.id);
    localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
  }

  public goBuy(name: string) {
    this.router.navigate(['/home/comprar'], { queryParams: { producto_name: name } })
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
}
