import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { AuthJwtDto } from '../dto/cliente/AuthJwtDto';
import { AuthLoginDto } from '../dto/cliente/authLoginDto';


const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private tokenService:TokenService) { }
  
  public login(authLonginDto: AuthLoginDto):Observable<AuthJwtDto>{
    return this.http.post<AuthJwtDto>(`${apiUrl}auth/sign-in`, authLonginDto).pipe(
      tap(
        response=>{
          this.tokenService.saveToken(response.jwt);
        }
      )
    )
  }
}
