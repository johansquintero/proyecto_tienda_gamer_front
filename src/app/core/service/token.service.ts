import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import jwt_decode from "jwt-decode";
import { AuthClientetDto } from '../dto/cliente/authClienteDto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string {
    return getCookie("token");
  }

  existsToken(): boolean {
    return getCookie("token") != null;
  }

  public saveToken(jwtToken: string): void {
    setCookie("token", jwtToken, {
      expires: 1,
      path: "/"
    });
  }

  public deleteToken(): void {
    removeCookie('token');
  }

  public getInfoToken():AuthClientetDto{
    return <AuthClientetDto>jwt_decode(this.getToken());
  }

}
