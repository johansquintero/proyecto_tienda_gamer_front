import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  productos: ProductoResponseDto[];
  paginator: any;
  searchValue: String = '';
  searchState: Boolean = false;
  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let page = params['page']
      if (!this.searchState) {
        if (page && !isNaN(page)) {
          this.getProductosByPage(page)
        } else {
          this.getProductosByPage(0)
        }
      } else {
        if (page && !isNaN(page)) {
          this.searchPage(page)
        } else {
          this.searchPage(0)
        }
      }
    })
  }
  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    })
  }
  public async getProductosByPage(page: number): Promise<void> {
    await lastValueFrom(this.productoService.getProductosByPage(page)).then(response => {
      this.paginator = response
      this.productos = response.content as ProductoResponseDto[]
    });
  }

  public goBuy(name: string) {
    this.router.navigate(['/home/comprar'], { queryParams: { producto_name: name } })
  }

  public async search(value: String): Promise<void> {
    this.searchValue = value
    if (this.searchValue == '') {
      this.searchState = false
      this.router.navigate(['/home'])
    } else {
      await lastValueFrom(this.productoService.getAllProductosByNamePage(0, this.searchValue)).then(response => {
        this.searchState = true
        this.paginator = response
        this.productos = response.content as ProductoResponseDto[]
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        }).then(r => {
          this.router.navigate(['/home'])
        });
      });
    }
  }
  public async searchPage(page: Number): Promise<void> {
    await lastValueFrom(this.productoService.getAllProductosByNamePage(page, this.searchValue)).then(response => {
      this.paginator = response
      this.productos = response.content as ProductoResponseDto[]
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      }).then(r => {
        this.router.navigate(['/home'])
      });
    });
  }

}