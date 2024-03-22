import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  public tipos: TipoDto[];
  public paginator: any;

  constructor(private tipoService: TipoService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((params:Params)=>{
      let page = params['page'];
      if (page||!isNaN(page)) {
        this.getTiposByPage(page)
      }else {
        this.getTiposByPage(0)
      }
    });
  }

  public async getTipos(): Promise<void> {
    await lastValueFrom(this.tipoService.getAll()).then(response => {
      this.tipos = response;
    })
  }
  public async getTiposByPage(page:Number):Promise<void> {
    await lastValueFrom(this.tipoService.getAllByPage(page)).then(response=>{
      this.paginator = response;
      this.tipos = response.content as TipoDto[];
    });
  }

  public async deleteTipo(tipoDto: TipoDto): Promise<void> {
    await lastValueFrom(this.tipoService.delete(tipoDto.id))
      .then(response => {
        this.tipos = this.tipos.filter(tipoFiltered => tipoFiltered.id != tipoDto.id);
        Swal.fire({
          icon: 'success',
          title: 'Marca eliminada',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      });
  }

  public goUpdate(tipo: TipoDto): void {
    this.tipoService.setSharedTipo(tipo);
    this.router.navigateByUrl(`/admin/tipo-form`);
  }
}
