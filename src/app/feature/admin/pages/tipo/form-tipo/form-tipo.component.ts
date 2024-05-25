import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { MarcaDto } from 'src/app/core/dto/marca/marcaDto';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { MarcaService } from 'src/app/core/service/marca.service';
import { TipoService } from 'src/app/core/service/tipo.service';
import { AppBaseComponent, goBack } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent extends AppBaseComponent {

  public formGroup: FormGroup;

  /**
   * Elementos para la logica de multiselect
   */
  public marcas: MarcaDto[];
  public marcasRigth: MarcaDto[];
  public marcasLeft: MarcaDto[];

  /** 
   * tipo compartido a traves del servicio tipoSerice
  */
  public sharedTipo: TipoDto;

  goBack = goBack;
  constructor(
    private marcaService: MarcaService,
    private tipoService: TipoService,
    private fb: FormBuilder,
    private router: Router) {
    super()
    this.sharedTipo = this.tipoService.getSharedTipo();
    this.initFormFields();
  }

  public initFormFields() {
    this.formGroup = this.fb.group(
      {
        name: [this.sharedTipo != null ? `${this.sharedTipo.name}` : '', [Validators.required, Validators.min(1), CustomValidators.LetterAndNumericValidator]],
      }
    )
  }

  ngOnInit() {
    this.marcaService.getAll().subscribe(reponse => {
      this.marcas = reponse;
      this.marcasLeft = reponse;
      if (this.sharedTipo == null || this.sharedTipo.marcas.length == 0) {
        this.marcasRigth = []
      } else {
        this.forUpdate()
      }
    })
  }

  ngOnDestroy() {
    this.tipoService.setSharedTipo(null);
  }

  public async register(): Promise<void> {
    let newTipo: TipoDto = this.formGroup.value;
    newTipo.marcas = this.marcasRigth;
    if (this.formGroup.valid) {
      await lastValueFrom(this.tipoService.save(newTipo))
        .then(response => {
          this.resetSides();
          this.formGroup.reset();
          Swal.fire({
            icon: 'success',
            title: `Tipo ${response.name} creado`,
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.detail
          });
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }
  }

  public async update(): Promise<void> {
    this.sharedTipo.name = this.formGroup.get('name').value;
    this.sharedTipo.marcas = this.marcasRigth;
    if (this.formGroup.valid) {
      await lastValueFrom(this.tipoService.update(this.sharedTipo))
        .then(response => {
          this.tipoService.setSharedTipo(null);
          Swal.fire({
            icon: 'success',
            title: `Tipo ${response.name} actualizado`,
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/admin/tipo');
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.detail
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }
  }


  /**
   * Para el caso de que sea update se asgignan a la izquieda los elementos del
   * tipo compartido por el servicio
   */
  public forUpdate() {
    this.sharedTipo.marcas.forEach(m => {//se recorren las marcars que le corresponden al tipo compartido
      this.marcasLeft = this.marcasLeft.filter(marcaLeft => marcaLeft.id != m.id);
    });
    this.marcasRigth = this.sharedTipo.marcas;
  }

  public moveLeft(marca: MarcaDto): void {
    this.marcasRigth = this.marcasRigth.filter(m => m.id != marca.id);
    this.marcasLeft.push(marca);
  }
  public moveRigth(marca: MarcaDto): void {
    this.marcasLeft = this.marcasLeft.filter(m => m.id != marca.id);
    this.marcasRigth.push(marca);
  }
  public resetSides(): void {
    this.marcasRigth = []
    this.marcasLeft = this.marcas
  }
}
