import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CartResponseDto } from '../dto/cart/cartResponseDto';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';
import { CartService } from '../service/cart.service';

export const cartResolver: ResolveFn<Observable<CartResponseDto>> = (route, state) => {
  const cartService = inject(CartService);
  const tokenService = inject(TokenService)
  let cliente = tokenService.getInfoToken()
  return cartService.getByUserId(cliente.id);
};
