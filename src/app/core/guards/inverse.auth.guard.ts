import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const inverseAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  if (tokenService.getToken) {
    alert("Error: para acceder a la pagina de login no debe tener una sesion iniciada");
    const router = inject(Router)
    router.navigateByUrl("/productos")    
    return false;
  }  
  return true;
};
