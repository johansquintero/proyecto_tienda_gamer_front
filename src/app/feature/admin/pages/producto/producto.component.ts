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
  page: number = 1;
  pageSize: number;
  collectionSize: number;

  searchValue: String = '';
  searchState: Boolean = false;
  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //carga de datos por resolve
    this.paginator = this.activatedRoute.snapshot.data['paginator'];
    this.collectionSize = parseInt(this.paginator.totalElements);
    this.pageSize = parseInt(this.paginator.numberOfElements);
    this.page = parseInt(this.paginator.number) + 1;
    this.productos = this.paginator.content as ProductoResponseDto[];

  }

  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    });
  }
  public async getProductosByPage(): Promise<void> {
    await lastValueFrom(this.productoService.getProductosByPage(this.page - 1)).then(response => {
      this.paginator = response
      this.collectionSize = parseInt(this.paginator.totalElements)
      this.page = parseInt(this.paginator.number) + 1
      this.productos = response.content as ProductoResponseDto[];
    });
  }

  public goDetail(id: number): void {
    this.router.navigate(['/admin/producto-detail'], { queryParams: { id: id } });
  }
  /**
   * funcion para realizar la busqueda a partir del valor del evento compartido desde el componente hijo Search
   * con la posibilidad de ir paginando las respuestas
   * @param value 
   */
  public async search(page: number, value: String): Promise<void> {
    this.searchValue = value
    if (this.searchValue == "") {//si el valor es vacio se vuelve a la paginacion normal
      this.searchState = false;
      this.ngOnInit()
    } else {
      await lastValueFrom(this.productoService.getAllProductosByNamePage(page - 1, this.searchValue)).then(response => {
        this.paginator = response;

        //solo se cambia el valor del tamano de cada pagina y el tamano de colleccion en la primera busqueda
        this.collectionSize = !this.searchState ? parseInt(this.paginator.totalElements) : this.collectionSize;
        this.pageSize = !this.searchState ? parseInt(this.paginator.numberOfElements) : this.pageSize;

        this.page = parseInt(this.paginator.number) + 1;
        this.productos = response.content as ProductoResponseDto[];
        this.searchState = true;
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        }).then(r => {
          this.ngOnInit()
        });
      });
    }
  }
}
