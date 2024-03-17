import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  productos: ProductoResponseDto[];
  paginator: any;
  constructor(private productoService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      let page = params['page']
      if (page && !isNaN(page)) {
        this.getProductosByPage(page)
      }else{
        this.getProductosByPage(0)
      }
    })
  }
  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    })
  }
  public async getProductosByPage(page:number):Promise<void>{
    await lastValueFrom(this.productoService.getProductosByPage(page)).then(response=>{
      this.paginator = response
      this.productos = response.content as ProductoResponseDto[]
    });
  }

  public goBuy(name: string) {
    this.router.navigate(['/home/comprar'], { queryParams: { producto_name: name } })
  }
}
