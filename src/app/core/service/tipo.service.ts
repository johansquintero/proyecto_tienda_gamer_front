import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TipoDto } from '../dto/tipo/tipoDto';
import Swal from 'sweetalert2';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  public sharedTipo:TipoDto;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<TipoDto[]> {
    return this.http.get<TipoDto[]>(`${apiUrl}tipos`);
  }

  public save(tipoDto: TipoDto): Observable<TipoDto> {
    return this.http.post<TipoDto>(`${apiUrl}tipos`, tipoDto).pipe(tap({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: `Tipo ${response.name} creado`,
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      }
    }));
  }

  public update(tipoDto: TipoDto): Observable<TipoDto> {
    return this.http.put<TipoDto>(`${apiUrl}tipos`, tipoDto).pipe(tap({
      next: response => {
        this.setSharedTipo(null);
        Swal.fire({
          icon: 'success',
          title: `Tipo ${response.name} actualizado`,
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      }
    }));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}tipos/${id}`).pipe(tap({
      next: response => {
        Swal.fire({
          icon: 'success',
          title: 'Marca eliminada',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      }
    }));
  }

  /**
   * Control del tipo compartido para enviar al formulario
   */

  public setSharedTipo(st:TipoDto):void{
    this.sharedTipo = st;
  }

  public getSharedTipo():TipoDto{
    return this.sharedTipo;
  }
  
}
