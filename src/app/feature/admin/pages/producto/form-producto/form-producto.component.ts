import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, tap } from 'rxjs';
import { ProductoRequestDto } from 'src/app/core/dto/produto/productoRequestDto';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import { TipoService } from 'src/app/core/service/tipo.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent extends AppBaseComponent {
  public tipos: TipoDto[];
  public formGroup: FormGroup;
  public tipoSelected: TipoDto;

  constructor(private tipoService: TipoService,
    private fb: FormBuilder,
    private productoService: ProductoService) {
    super()
    this.initFields();
  }

  ngOnInit() {
    this.getTipos();
  }

  public initFields() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), CustomValidators.LetterValidator]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidators.NumericValidator]],
      tipoId: ['', [Validators.required, CustomValidators.NumericValidator]],
      marcaId: ['', [Validators.required, CustomValidators.NumericValidator]],
      quantity: ['', [Validators.required, CustomValidators.NumericValidator]],
      imagePath: ['']
    });

    //si el valor del select de tipo cambio se asigna a la variable tipoSelected el correspondiente tipo
    this.formGroup.get('tipoId').valueChanges.subscribe(x => {
      this.tipos.forEach(tipo => {
        if (tipo.id == x) {
          this.tipoSelected = tipo;
        }
      });
    });
  }
  public async getTipos(): Promise<void> {
    await lastValueFrom(this.tipoService.getAll()).then(
      response => {
        this.tipos = response;
      }
    )
  }

  public async registerProducto(): Promise<void> {
    let producto: ProductoRequestDto;
    if (this.formGroup.valid) {
      producto = this.formGroup.value;
      await lastValueFrom(this.productoService.save(producto).pipe(tap({
        next: response => {
          Swal.fire({
            icon: 'success',
            title: `Producto ${response.name} creado`,
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
      })));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }
  }

  public goDetail(id: number): void {

  }
}
