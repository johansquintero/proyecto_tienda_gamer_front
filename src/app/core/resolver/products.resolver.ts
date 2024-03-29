import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoResponseDto } from '../dto/produto/productoResponseDto';
import { inject } from '@angular/core';
import { ProductoService } from '../service/producto.service';

export const productsResolver: ResolveFn<Observable<ProductoResponseDto[]>> = (route: ActivatedRouteSnapshot, state) => {
  const productoService = inject(ProductoService)
  return productoService.getProductos();
};
