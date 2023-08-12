import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router);
  if (!tokenService.existsToken()) {
    alert("Error: para acceder a la siguiente pagina debe estar autentificado");    
    router.navigateByUrl("/autenticacion/inicio-sesion");    
    return false;
  }
  return true;
};
