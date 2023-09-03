import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductoResponseDto } from '../dto/produto/productoResponseDto';
import { ProductoRequestDto } from '../dto/produto/productoRequestDto';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  public getProductos(): Observable<ProductoResponseDto[]> {
    return this.http.get<ProductoResponseDto[]>(`${apiUrl}productos`);
  }

  public save(producto: ProductoRequestDto): Observable<ProductoResponseDto> {
    return this.http.post<ProductoResponseDto>(`${apiUrl}productos`, producto);
  }

  public getProducto(id: Number): Observable<ProductoResponseDto> {
    return this.http.get<ProductoResponseDto>(`${apiUrl}productos/${id}`);
  }
}
