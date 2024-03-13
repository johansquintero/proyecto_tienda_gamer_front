import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
  }
  public async getProductos(): Promise<void> {
    await lastValueFrom(this.productoService.getProductos()).then(response => {
      this.productos = response;
    })
  }

  public goBuy(name: string) {
    this.router.navigate(['/home/comprar'], { queryParams: { producto_name: name } })
  }
}
