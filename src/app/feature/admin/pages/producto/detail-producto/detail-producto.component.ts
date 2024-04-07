import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrls: ['./detail-producto.component.scss']
})
export class DetailProductoComponent extends AppBaseComponent {

  producto: ProductoResponseDto;
  public formGroup: FormGroup;
  public imageSelected!: File;
  public uploadProgress: number = 0;

  constructor(
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    super();
    this.initFields();
  }

  ngOnInit() {
    this.getProducto();
  }
  public initFields() {
    //grupo de formulario
    this.formGroup = this.fb.group({
      imagePath: [null, [CustomValidators.validateImage]]
    });
  }

  public async getProducto(): Promise<void> {
    let id = 0;
    this.activateRoute.queryParams.subscribe((params: Params) => {
      id = params['id']
    })
    await lastValueFrom(this.productoService.getProducto(id)).then(response => {
      this.producto = response
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.detail
      });
      this.router.navigateByUrl("home");
    })
  }
  public selectFile(event: any) {
    this.uploadProgress = 0;
    this.imageSelected = event.target.files[0];
    if (this.imageSelected.type.indexOf('image') < 0) {
      this.formGroup.get('imagePath').setValue('');
      Swal.fire('Error al seleccionar imagen', `El archivo debe ser del tipo imagen`, 'error');
    }
  }
  public async upload() {
    if (this.formGroup.valid) {
      await lastValueFrom(this.productoService.uploadImage(this.imageSelected, this.producto.id)).then(response => {
        Swal.fire({
          icon: 'success',
          title: response.mensaje,
          showConfirmButton: true,
          timer: 1500
        });
        this.producto.imagePath = response.newImage
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.error,
          showConfirmButton: true,
          timer: 1500
        });
      })
    }
  }

  public goUpdate() {
    this.productoService.setSharedProducto(this.producto);
    this.router.navigateByUrl("admin/producto-form");
  }
}
