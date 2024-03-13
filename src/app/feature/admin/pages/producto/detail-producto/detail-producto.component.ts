import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrls: ['./detail-producto.component.css']
})
export class DetailProductoComponent {

  producto: ProductoResponseDto;

  constructor(private productoService: ProductoService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProducto();
  }

  public async getProducto(): Promise<void> {
    let id = 0;
    this.activateRoute.queryParams.subscribe((params: Params) => {
      id = params['id']
    })
    await lastValueFrom(this.productoService.getProducto(id).pipe(tap({
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
        this.router.navigateByUrl("home");
      }
    }))).then(response => {
      this.producto = response
    })
  }
  
  public goUpdate(){
    this.productoService.setSharedProducto(this.producto);
    this.router.navigateByUrl("admin/producto-form");
  }
}
