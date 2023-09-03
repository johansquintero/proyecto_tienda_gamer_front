import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { TipoService } from 'src/app/core/service/tipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent {

  public tipos:TipoDto[];

  constructor(private tipoService:TipoService, private router:Router ){ }

  ngOnInit() {
    this.getTipos();    
  }

  public async getTipos():Promise<void>{
    await lastValueFrom(this.tipoService.getAll()).then(response=>{
      this.tipos = response;
    })
  }

  public async deleteTipo(tipoDto:TipoDto):Promise<void>{
    await lastValueFrom(this.tipoService.delete(tipoDto.id).pipe(tap({
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
    }))).then(response=>{
      this.tipos = this.tipos.filter(tipoFiltered=>tipoFiltered.id!=tipoDto.id);
    });
  }

  public goUpdate(tipo:TipoDto):void{
    this.tipoService.setSharedTipo(tipo);
    this.router.navigateByUrl(`/admin/tipo-form`);
  }
}
