import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let headers;

    let token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request);
    }

    headers = {
      'Authorization': 'Bearer ' + token
    }

    let authRequest = request.clone({//se clona la peticion http
      setHeaders: {
        ...headers//concatena los atributos headers con authRequest
      }
    });
    //console.log("TokenInterceptor => " + 'Bearer ' + token)
    return next.handle(authRequest).pipe(
      catchError((err:HttpErrorResponse)=>{
        if (err.status==403) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes permiso para acceder a esta pagina'
          });
          console.log("Fallo e la autenticacion");
        }
        return throwError(()=>err);        
      })
    );
  }
}
