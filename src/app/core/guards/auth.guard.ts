import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  if (!tokenService.getToken) {
    alert("Error: para acceder a la siguiente pagina debe estar autentificado");
    const router = inject(Router)
    router.navigateByUrl("")    
    return false;
  }
  return true;
};
