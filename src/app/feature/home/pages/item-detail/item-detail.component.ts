import { ProductoCartDto } from './../../../../core/dto/produto/poductoCartDto';
import { PurchaseDialogService } from './../../../../core/service/purchase-dialog.service';
import { CompraRequestDto } from '../../../../core/dto/compra/compraRequestDto';
import { Component} from '@angular/core';
import { FormControl} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CartRequestDto } from 'src/app/core/dto/cart/cartRequestDto';
import { CartResponseDto } from 'src/app/core/dto/cart/cartResponseDto';
import { AuthClientetDto } from 'src/app/core/dto/cliente/authClienteDto';
import { CompraProductoRequestDto } from 'src/app/core/dto/compraproducto/compraProductoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { TokenService } from 'src/app/core/service/token.service';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-window',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
  producto: ProductoResponseDto;
  quantity: FormControl;
  cliente: AuthClientetDto;
  carrito: CartResponseDto;
  listaCarrito: ProductoResponseDto[];

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private cartService: CartService,
    private purchaseDialogService:PurchaseDialogService
  ) {}

  ngOnInit() {
    this.quantity = new FormControl(1, [CustomValidators.NumericValidator]);
    this.getProducto();
    this.cliente = this.tokenService.getInfoToken();
    if (this.activatedRoute.snapshot.data['cart']) {
      this.carrito = this.activatedRoute.snapshot.data['cart'];
      this.listaCarrito = this.carrito.productos;
      console.log((this.carrito = this.activatedRoute.snapshot.data['cart']));
    }
  }

  public async GetCart(customerId: number): Promise<void> {
    await lastValueFrom(this.cartService.getByUserId(customerId)).then(
      (response) => {
        this.carrito = response;
        this.listaCarrito = response.productos;
      }
    );
  }

  public async getProducto() {
    let name = 1;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      name = params['producto_id'] ? params['producto_id'] : 1;
    });
    await lastValueFrom(this.productoService.getProducto(name))
      .then((response) => {
        this.producto = response;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail,
        }).then((value) => {
          this.router.navigate(['home']);
        });
      });
  }

  public async generatePurchase(): Promise<void> {
    let compraProductoRequestDto: CompraProductoRequestDto =
      new CompraProductoRequestDto();
    compraProductoRequestDto.quantity = this.quantity.value as number;
    compraProductoRequestDto.productId = this.producto.id;
    compraProductoRequestDto.total = this.producto.price * this.quantity.value;

    let compraRequestDto: CompraRequestDto = new CompraRequestDto();
    compraRequestDto.date = this.getActualDateFormatted();
    compraRequestDto.customerId = this.cliente.id;
    compraRequestDto.paymentMethod = 'debito';
    compraRequestDto.compraProductos.push(compraProductoRequestDto);
    compraRequestDto.compraProductos.forEach((compraProductoRequestDto) => {
      compraRequestDto.total += compraProductoRequestDto.total;
    });
    //lista de carrito para enviar al dialog con los checked
    let listaCarrito:ProductoCartDto[] = this.carrito.productos.map(p=> {
      let x = p as ProductoCartDto
      x.checked = false
      if (x.id==this.producto.id) {
        x.checked = true
      }
      return x
    });

    this.purchaseDialogService.openDialog(compraRequestDto,this.carrito,listaCarrito);
  }

  public async updateCart(cart: CartRequestDto): Promise<void> {
    await lastValueFrom(this.cartService.update(cart))
      .then((response) => {
        this.carrito = response;
        this.listaCarrito = response.productos;
        this.cartService.actualizarCarrito(response);//notificar cambio del carrito
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail,
        });
      });
  }

  public addToCart() {
    this.listaCarrito.push(this.producto);
    var cartRequest: CartRequestDto = new CartRequestDto();
    cartRequest.customerId = this.carrito.customerId;
    cartRequest.productos = this.listaCarrito;
    cartRequest.id = this.carrito.id;
    this.updateCart(cartRequest);
  }

  public deleteFromCart() {
    this.listaCarrito = this.listaCarrito.filter(
      (p: ProductoResponseDto) => p.id != this.producto.id
    );
    var cartRequest: CartRequestDto = new CartRequestDto();
    cartRequest.customerId = this.carrito.customerId;
    cartRequest.productos = this.listaCarrito;
    cartRequest.id = this.carrito.id;
    this.updateCart(cartRequest);
  }
  public isInCart() {
    return this.listaCarrito.find(
      (p: ProductoResponseDto) => p.id == this.producto.id
    );
  }

  /**
   * Genera el el numero total de cantidades del producto para el select
   * @returns
   */
  generateQuantities(): number[] {
    let numbers: number[] = [];
    if (this.producto.quantity > 50) {
      for (let index = 1; index <= 50; index++) {
        numbers.push(index);
      }
    } else {
      for (let index = 1; index <= this.producto.quantity; index++) {
        numbers.push(index);
      }
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
    let milisegundos = fechaHoraActual
      .getMilliseconds()
      .toString()
      .padStart(3, '0');

    // Formatea la fecha y hora en el formato deseado
    let fechaHoraFormateada = `${año}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milisegundos}`;
    return fechaHoraFormateada;
  }

  public volverPaginaAnterior() {
    window.history.back();
  }
}
