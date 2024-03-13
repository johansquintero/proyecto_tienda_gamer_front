import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CompraRequestDto } from '../dto/compra/compraRequestDto';
import { Observable } from 'rxjs';
import { CompraIdResponseDto } from '../dto/compra/compraIdResponseDto';
import { CompraResponseDto } from '../dto/compra/compraResponseDto';

const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) {}

  public save(compra:CompraRequestDto):Observable<CompraIdResponseDto>{
    return this.http.post<CompraIdResponseDto>(`${apiUrl}compras`,compra);
  }

  public getCompraByCliente(clienteId:number):Observable<CompraResponseDto[]>{
    return this.http.get<CompraResponseDto[]>(`${apiUrl}compras/cliente/${clienteId}`);
  }
  public getCompraById(compraId:number):Observable<CompraResponseDto>{
    return this.http.get<CompraResponseDto>(`${apiUrl}compras/${compraId}`);
  }
}
