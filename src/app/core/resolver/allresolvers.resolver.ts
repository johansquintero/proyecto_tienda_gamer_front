import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { MarcaService } from '../service/marca.service';
import { TipoService } from '../service/tipo.service';
import { CompraService } from '../service/compra.service';
import { TokenService } from '../service/token.service';

export const productsResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state) => {
  const productoService = inject(ProductoService)
  return productoService.getProductosByPage(0);
};

export const branchResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state) => {
  const marcaService = inject(MarcaService)
  return marcaService.getAllByPage(0);
};

export const typeResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state) => {
  const tipoService = inject(TipoService)
  return tipoService.getAllByPage(0);
};

export const buyResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state) => {
  const compraService = inject(CompraService)
  const tokenService = inject(TokenService)
  let cliente = tokenService.getInfoToken()
  return compraService.getCompraByClientePage(cliente.id,0);
};