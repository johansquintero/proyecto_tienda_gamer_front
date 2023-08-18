import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MarcaResponseDto } from '../dto/marca/marcaResponse';
import { MarcaRequestDto } from '../dto/marca/marcaRequestDto';
import Swal from 'sweetalert2';
import { MarcaDto } from '../dto/marca/marcaDto';
const { apiUrl } = environment
@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  public sharedMarca: MarcaDto;
  constructor(private http: HttpClient) { }



  public getAll(): Observable<MarcaDto[]> {
    return this.http.get<MarcaDto[]>(`${apiUrl}marcas`);
  }

  public register(marcaRequestDto: MarcaRequestDto): Observable<MarcaResponseDto> {
    return this.http.post<MarcaResponseDto>(`${apiUrl}marcas`, marcaRequestDto).pipe(tap({
      next: value => {
        if (value.id) {
          Swal.fire({
            icon: 'success',
            title: 'Marca registrada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      }
    }));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}marcas/${id}`).pipe(tap({
      next: value => {
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

  public update(marcaDto: MarcaDto): Observable<MarcaDto> {
    return this.http.put<MarcaDto>(`${apiUrl}marcas`, marcaDto).pipe(tap({
      next: value => {
        if (value.id) {
          this.setSharedMarca(null);
          Swal.fire({
            icon: 'success',
            title: `Marca ${value.name} actualizada correctamente`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      }
    }));
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
