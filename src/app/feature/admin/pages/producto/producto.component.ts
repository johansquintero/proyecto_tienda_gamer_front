import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos: ProductoResponseDto[];
  paginator: any;
  searchValue: String = '';
  searchState: Boolean = false;
  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let page = 0
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      page = params['page']
      if (!this.searchState) {
        if (page && !isNaN(page)) {
          this.getProductosByPage(page)
        } else {
          this.getProductosByPage(0)
        }
      } else {
        if (page && !isNaN(page)) {
          this.searchPage(page, this.searchValue)
        } else {
          this.searchPage(0, this.searchValue)
        }
      }
    });

    //carga de datos por resolve
    //console.log(this.activatedRoute.snapshot.data['products'])
  }

  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    });
  }
  public async getProductosByPage(page: number): Promise<void> {
    await lastValueFrom(this.productoService.getProductosByPage(page)).then(response => {
      this.paginator = response
      this.productos = response.content as ProductoResponseDto[];
    });
  }
  public goDetail(id: number): void {
    this.router.navigate(['/admin/producto-detail'], { queryParams: { id: id } });
  }

  public async search(value: String): Promise<void> {
    this.searchValue = value
    if (this.searchValue == "") {
      this.searchState = false;
      this.router.navigate(['/admin'])
    } else {
      await lastValueFrom(this.productoService.getAllProductosByNamePage(0, this.searchValue)).then(response => {
        this.searchState = true;
        this.paginator = response;
        this.productos = response.content as ProductoResponseDto[];
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        }).then(r => {
          this.router.navigate(['/admin'])
        });
      });
    }
  }
  public async searchPage(page: Number, value: String): Promise<void> {
    await lastValueFrom(this.productoService.getAllProductosByNamePage(page, value)).then(response => {
      this.paginator = response;
      this.productos = response.content as ProductoResponseDto[];
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      }).then(r => {
        this.router.navigate(['/admin'])
      });
    });
  }
}

