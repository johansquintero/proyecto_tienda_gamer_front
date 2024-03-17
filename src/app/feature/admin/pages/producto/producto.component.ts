import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  public productos: ProductoResponseDto[];
  paginator: any;

  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let page = 0
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      page = params['page']
      if (page && !isNaN(page)) {
        this.getProductosByPage(page)
      }else{
        this.getProductosByPage(0)
      }
    });

  }

  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    });
  }
  public async getProductosByPage(page:number): Promise<void> {
    await lastValueFrom(this.productoService.getProductosByPage(page)).then(response => {
      this.paginator = response
      this.productos = response.content as ProductoResponseDto[];
    });
  }
  public goDetail(id: number): void {
    this.router.navigate(['/admin/producto-detail'], { queryParams: { id: id } });
  }
}
