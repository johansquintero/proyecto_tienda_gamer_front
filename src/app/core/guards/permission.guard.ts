import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';

export const permissionGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  let cliente = tokenService.getInfoToken();
  if (cliente.role != "ADMIN") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No tiene los privilegios necesarios para ingresar a este sitio.'
    }).then((result) => {
      window.history.back();
    });
    return false;
  }
  return true;
};
