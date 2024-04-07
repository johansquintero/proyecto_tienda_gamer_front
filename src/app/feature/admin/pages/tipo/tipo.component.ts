import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { TipoService } from 'src/app/core/service/tipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent {

  public tipos: TipoDto[];
  public paginator: any;
  page: number = 1;
  pageSize: number;
  collectionSize: number;

  constructor(private tipoService: TipoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paginator = this.activatedRoute.snapshot.data['paginator']
    this.collectionSize = parseInt(this.paginator.totalElements);
    this.pageSize = parseInt(this.paginator.numberOfElements);
    this.page = parseInt(this.paginator.number) + 1;
    this.tipos = this.paginator.content as TipoDto[];
  }

  public async getTipos(): Promise<void> {
    await lastValueFrom(this.tipoService.getAll()).then(response => {
      this.tipos = response;
    })
  }
  public async getTiposByPage():Promise<void> {
    await lastValueFrom(this.tipoService.getAllByPage(this.page-1)).then(response=>{
      this.paginator = response;
      this.tipos = response.content as TipoDto[];
      this.page = this.page = parseInt(this.paginator.number) + 1;
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
