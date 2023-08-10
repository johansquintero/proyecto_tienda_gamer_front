import { Component } from '@angular/core';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  public productos:ProductoResponseDto[];
}
