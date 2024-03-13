import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';

export const inverseAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  if (tokenService.existsToken()) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ya existe una sesion iniciada'
    }).then((result)=>{
      window.history.back();
    });
    return false;
  }  
  return true;
};
