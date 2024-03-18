import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { MarcaDto } from 'src/app/core/dto/marca/marcaDto';
import { MarcaService } from 'src/app/core/service/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  public marcas: MarcaDto[];
  public paginator: any;

  constructor(private marcaService: MarcaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let page = params['page']
      if (page && !isNaN(page)) {
        this.getMarcasByPage(page);
      } else {
        this.getMarcasByPage(0);
      }
    })
  }

  public async getMarcas(): Promise<void> {
    await lastValueFrom(this.marcaService.getAll()).then(response => {
      this.marcas = response;
    });
  }

  public async getMarcasByPage(page: number): Promise<void> {
    await lastValueFrom(this.marcaService.getAllByPage(page)).then(response => {
      this.marcas = response.content as MarcaDto[];
      this.paginator = response;
    });
  }

  public async deleteMarca(marca: MarcaDto): Promise<void> {
    await lastValueFrom(this.marcaService.delete(marca.id))
      .then(response => {
        this.marcas = this.marcas.filter(marcaFiltered => marcaFiltered != marca)
        Swal.fire({
          icon: 'success',
          title: 'Marca eliminada',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      });
  }

  public goUpdate(marca: MarcaDto): void {
    this.marcaService.setSharedMarca(marca);
    this.router.navigateByUrl(`/admin/marca-form`);
  }
}
