import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const inverseAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.existsToken()) {
    alert("Error: para acceder a la pagina de login no debe tener una sesion iniciada");    
    router.navigateByUrl("/home")    
    return false;
  }  
  return true;
};
