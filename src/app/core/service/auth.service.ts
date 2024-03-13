import { AuthJwtDto } from './../dto/cliente/authJwtDto';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { AuthLoginDto } from '../dto/cliente/authLoginDto';
import { Router } from '@angular/router';


const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  public login(authLonginDto: AuthLoginDto): Observable<AuthJwtDto> {
    return this.http.post<AuthJwtDto>(`${apiUrl}auth/sign-in`, authLonginDto).pipe(
      tap(
        response => {
          this.tokenService.saveToken(response.jwt);
        }
      )
    )
  }
  public signOut(): Observable<AuthJwtDto> {
    return this.http.delete<AuthJwtDto>(`${apiUrl}auth/sign-out`).pipe(tap(response => {
      if (response) {
        this.tokenService.deleteToken();
        this.router.navigateByUrl("/autenticacion/inicio-sesion");
      }
    }));
  }
}
