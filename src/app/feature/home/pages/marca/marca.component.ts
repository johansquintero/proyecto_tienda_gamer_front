import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MarcaDto } from 'src/app/core/dto/marca/marcaDto';
import { MarcaService } from 'src/app/core/service/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  public marcas: MarcaDto[];

  constructor(private marcaService: MarcaService,private router:Router) {}

  ngOnInit() {
    this.getMarcas();
  }

  public async getMarcas(): Promise<void> {
    await lastValueFrom(this.marcaService.getAll()).then(response => {
      this.marcas = response;
    });
  }

  public async deleteMarca(marca: MarcaDto): Promise<void> {
    await lastValueFrom(this.marcaService.delete(marca.id)).then(response => {
      this.marcas = this.marcas.filter(marcaFiltered => marcaFiltered != marca)
    });
  }

  public goUpdate(marca:MarcaDto):void{
    this.marcaService.setSharedMarca(marca);
    this.router.navigateByUrl(`/home/marca-form`);
  }
}
