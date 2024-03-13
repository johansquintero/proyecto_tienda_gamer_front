import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TipoDto } from '../dto/tipo/tipoDto';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private sharedTipo: TipoDto;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<TipoDto[]> {
    return this.http.get<TipoDto[]>(`${apiUrl}tipos`);
  }

  public save(tipoDto: TipoDto): Observable<TipoDto> {
    return this.http.post<TipoDto>(`${apiUrl}tipos`, tipoDto);
  }

  public update(tipoDto: TipoDto): Observable<TipoDto> {
    return this.http.put<TipoDto>(`${apiUrl}tipos`, tipoDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}tipos/${id}`)
  }

  /**
   * Control del tipo compartido para enviar al formulario
   */

  public setSharedTipo(st: TipoDto): void {
    this.sharedTipo = st;
  }

  public getSharedTipo(): TipoDto {
    return this.sharedTipo;
  }

}
