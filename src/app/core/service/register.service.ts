import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthRegisterRequestDto } from '../dto/cliente/authRegisterRequestDto';
import { Observable, tap } from 'rxjs';
import { AuthRegisterResponseDto } from '../dto/cliente/authRegisterResponseDto';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http:HttpClient) { }

  public register(registerRequestDto:AuthRegisterRequestDto):Observable<AuthRegisterResponseDto>{
    return this.http.post<AuthRegisterResponseDto>(`${apiUrl}auth/register`,registerRequestDto);
  }
}
