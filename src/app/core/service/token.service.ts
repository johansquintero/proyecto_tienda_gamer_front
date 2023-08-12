import { Injectable } from '@angular/core';
import { getCookie, setCookie} from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken():string{
    return getCookie("token");
  }

  existsToken():boolean{
    return getCookie("token")!=null;
  }

  public saveToken(jwtToken:string):void{
    setCookie("token",jwtToken,{
      expires:1,
      path:"/"
    });
  }
  public deleteToken():void{

  }
}
