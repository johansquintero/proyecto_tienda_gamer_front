import { Injectable } from '@angular/core';
import { AuthLoginDto } from '../dto/cliente/AuthLoginDto';
import { Observable } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthJwtDto } from '../dto/cliente/AuthJwtDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) {}
  public login(authDto:AuthLoginDto):Observable<AuthJwtDto>{
    return this.http.post<AuthJwtDto>(this.apiUrl+"auth/sign-in",authDto);
  }
}
