import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MarcaDto } from 'src/app/core/dto/marca/marcaDto';
import { MarcaRequestDto } from 'src/app/core/dto/marca/marcaRequestDto';
import { MarcaService } from 'src/app/core/service/marca.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent extends AppBaseComponent {
  public formGroup: FormGroup;
  public sharedMarca: MarcaDto;

  constructor(private fb: FormBuilder, private marcaService: MarcaService,private router:Router) {
    super();
    this.sharedMarca = this.marcaService.getSharedMarca();//marca compartida si se va a actualizar una marca 
    this.formGroup = this.fb.group({
      name: [this.sharedMarca != null ? `${this.sharedMarca.name}` : '', [Validators.required, Validators.min(1), CustomValidators.LetterValidator]]
    });
  }
  ngOnDestroy(){//cuando se destruya el componente se asigna a null el objeto compartido
    this.marcaService.setSharedMarca(null);
  }

  public async register(): Promise<void> {
    let marca: MarcaRequestDto;
    if (this.formGroup.valid) {
      marca = this.formGroup.value;
      await lastValueFrom(this.marcaService.register(marca));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }
  }

  public async update(): Promise<void> {
    let marca: MarcaDto;
    if (this.formGroup.valid) {
      marca = this.sharedMarca;
      marca.name = this.formGroup.get('name').value;
      await lastValueFrom(this.marcaService.update(marca));
      this.router.navigateByUrl('/home/marca')
      Router
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }
  }
}
