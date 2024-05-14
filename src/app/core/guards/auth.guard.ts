import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router);
  if (!tokenService.existsToken()) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Para acceder al siguiente sitio debe estar autentificado.'
    }).then(() => {
      router.navigate(["/autenticacion/inicio-sesion"]); 
    });
    return false;
  }
  return true;
};
