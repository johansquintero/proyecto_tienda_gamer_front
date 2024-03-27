import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CartRequestDto } from 'src/app/core/dto/cart/cartRequestDto';
import { CartResponseDto } from 'src/app/core/dto/cart/cartResponseDto';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraRequestDto } from 'src/app/core/dto/compra/compraRequestDto';
import { CompraProductoRequestDto } from 'src/app/core/dto/compraproducto/compraProductoRequestDto';
import { ProductoRequestDto } from 'src/app/core/dto/produto/productoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { CartService } from 'src/app/core/service/cart.service';
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
  public carrito: CartResponseDto;

  constructor(private router: Router,
    private cartService: CartService,
    private tokenService: TokenService,
    private compraService: CompraService) { }

  ngOnInit() {
    this.cliente = this.tokenService.getInfoToken()
    if (this.cliente) {
      this.GetCart(this.cliente.id);
    }
  }

  public async GetCart(customerId: number): Promise<void> {
    await lastValueFrom(this.cartService.getByUserId(customerId)).then(response => {
      this.carrito = response;
      this.listaCarrito = this.carrito.productos.map(p => {
        return { ...p, selectedQuantity: 1 }
      });
    })
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
          var cartRequest: CartRequestDto = new CartRequestDto()
          cartRequest.customerId = this.carrito.customerId
          cartRequest.productos = []
          cartRequest.id = this.carrito.id
          this.updateCart(cartRequest);
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

  public async updateCart(cart: CartRequestDto): Promise<void> {
    await lastValueFrom(this.cartService.update(cart)).then(response => {
      this.carrito = response
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      })
    })
  }
  public deleteFromCart(producto: any) {
    this.listaCarrito = this.listaCarrito.filter((p: ProductoResponseDto) => p.id != producto.id);
    var cartRequest: CartRequestDto = new CartRequestDto()
    cartRequest.customerId = this.carrito.customerId
    cartRequest.productos = this.listaCarrito.map(p => {
      delete p.selectedQuantity;
      return p
    });
    cartRequest.id = this.carrito.id
    this.updateCart(cartRequest);
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



  public goBuy(id: number) {
    this.router.navigate(['/home/comprar'], { queryParams: { producto_id: id } })
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
