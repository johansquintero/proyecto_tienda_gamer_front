import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  public productos:ProductoResponseDto[];
  
  constructor(private productoService:ProductoService){}

  ngOnInit(){
    this.getProductos();
  }

  public async getProductos():Promise<void>{
    await lastValueFrom(this.productoService.getProductos()).then(response=>{
      this.productos = response;
    });
  }
}
