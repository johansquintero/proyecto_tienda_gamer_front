import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MarcaDto } from 'src/app/core/dto/marca/marcaDto';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { MarcaService } from 'src/app/core/service/marca.service';
import { TipoService } from 'src/app/core/service/tipo.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.css']
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
        name: [this.sharedTipo != null ? `${this.sharedTipo.name}`:'', [Validators.required, Validators.min(1), CustomValidators.LetterAndNumericValidator]],
      }
    )
  }

  ngOnInit() {    
    this.marcaService.getAll().subscribe(reponse => {
      this.marcas = reponse;
      this.marcasRigth = reponse;
      if (this.sharedTipo == null || this.sharedTipo.marcas.length == 0) {
        this.marcasLeft = []
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
    newTipo.marcas = this.marcasLeft;
    if (this.formGroup.valid) {
      await lastValueFrom(this.tipoService.save(newTipo)).then(response => {
        this.resetSides();
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
    this.sharedTipo.marcas = this.marcasLeft;
    console.log(this.sharedTipo);
    if (this.formGroup.valid) {
      await lastValueFrom(this.tipoService.update(this.sharedTipo)).then(response => {
        this.router.navigateByUrl('/home/tipo');
      })
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
    this.sharedTipo.marcas.forEach(m => {
      this.marcasRigth = this.marcasRigth.filter(marcaRigth => marcaRigth.id != m.id);
    });
    this.marcasLeft = this.sharedTipo.marcas;
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
    this.marcasLeft = []
    this.marcasRigth = this.marcas
  }
}
