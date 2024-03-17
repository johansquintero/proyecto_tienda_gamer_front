import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  private sharedProducto:ProductoResponseDto;

  constructor(private http: HttpClient) { }

  public getProductos(): Observable<ProductoResponseDto[]> {
    return this.http.get<ProductoResponseDto[]>(`${apiUrl}productos`);
  }
  public getProductosByPage(page:number): Observable<any> {
    return this.http.get(`${apiUrl}productos/page/${page}`);
  }

  public save(producto: ProductoRequestDto): Observable<ProductoResponseDto> {
    return this.http.post<ProductoResponseDto>(`${apiUrl}productos`, producto);
  }

  public update(producto: ProductoRequestDto): Observable<ProductoResponseDto> {
    return this.http.put<ProductoResponseDto>(`${apiUrl}productos`, producto);
  }

  public getProducto(id: Number): Observable<ProductoResponseDto> {
    return this.http.get<ProductoResponseDto>(`${apiUrl}productos/${id}`);
  }
  public getProductoByName(name:string): Observable<ProductoResponseDto> {
    return this.http.get<ProductoResponseDto>(`${apiUrl}productos/name/${name}`);
  }
  public uploadImage(image:File,productoId:any):Observable<any>{
    let formData = new FormData()
    formData.append("file", image);
    formData.append("id", productoId);
    return this.http.post(`${apiUrl}productos/upload`,formData)
  }

  public getSharedProducto():ProductoResponseDto{
    return this.sharedProducto;
  }
  public setSharedProducto(sharedProducto:ProductoResponseDto){
    this.sharedProducto = sharedProducto;
  }
}
