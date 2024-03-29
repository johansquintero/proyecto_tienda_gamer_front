import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MarcaResponseDto } from '../dto/marca/marcaResponse';
import { MarcaRequestDto } from '../dto/marca/marcaRequestDto';
import { MarcaDto } from '../dto/marca/marcaDto';
const { apiUrl } = environment
@Injectable()
export class MarcaService {
  private sharedMarca: MarcaDto;
  constructor(private http: HttpClient) { }



  public getAll(): Observable<MarcaDto[]> {
    return this.http.get<MarcaDto[]>(`${apiUrl}marcas`);
  }

  public getAllByPage(page:number):Observable<any>{
    return this.http.get(`${apiUrl}marcas/page/${page}`);
  }

  public register(marcaRequestDto: MarcaRequestDto): Observable<MarcaResponseDto> {
    return this.http.post<MarcaResponseDto>(`${apiUrl}marcas`, marcaRequestDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}marcas/${id}`);
  }

  public update(marcaDto: MarcaDto): Observable<MarcaDto> {
    return this.http.put<MarcaDto>(`${apiUrl}marcas`, marcaDto);
  }

  /**recursos de marcaDto a compartir con el fin de permitir al formulario reconocer si es un update o register
   * 
   * @param marca 
   */

  public setSharedMarca(marca: MarcaDto): void {
    this.sharedMarca = marca;
  }
  public getSharedMarca(): MarcaDto {
    return this.sharedMarca;
  }
}
