import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductoResponseDto } from '../dto/produto/productoResponseDto';

const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http:HttpClient) { }

  public getProductos():Observable<ProductoResponseDto[]>{
    return this.http.get<ProductoResponseDto[]>(`${apiUrl}productos`);
  }
}
