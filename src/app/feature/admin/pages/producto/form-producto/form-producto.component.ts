import { MarcaDto } from './../../../../../core/dto/marca/marcaDto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { ProductoRequestDto } from 'src/app/core/dto/produto/productoRequestDto';
import { ProductoResponseDto } from 'src/app/core/dto/produto/productoResponseDto';
import { TipoDto } from 'src/app/core/dto/tipo/tipoDto';
import { ProductoService } from 'src/app/core/service/producto.service';
import { TipoService } from 'src/app/core/service/tipo.service';
import { AppBaseComponent, goBack } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-form-producto',
	templateUrl: './form-producto.component.html',
	styleUrls: ['./form-producto.component.scss']
})
export class FormProductoComponent extends AppBaseComponent {
	public tipos: TipoDto[]; //tipos de la lista
	public formGroup: FormGroup;
	public tipoSelected: TipoDto; //tipo seleccionado
	public sharedProducto: ProductoResponseDto; // productos compartido a editar
	public marcas: MarcaDto[];
	goBack = goBack;

	constructor(private tipoService: TipoService, private fb: FormBuilder, private productoService: ProductoService, private router: Router) {
		super();
		this.getTipos();
		this.sharedProducto = this.productoService.getSharedProducto();
		this.initFields();
	}

	ngOnInit() {
		//si el valor del select de tipo cambio se asigna a la variable tipoSelected el correspondiente tipo
		this.formGroup.controls['tipoId'].valueChanges.subscribe((x) => {
			this.tipoSelected = this.tipos.find((tipo) => tipo.id == x);
			this.marcas = this.tipoSelected.marcas;
		}); /*
		this.formGroup.get('tipoId').valueChanges.subscribe((x) => {
			this.tipos.forEach((tipo) => {
				if (tipo.id == x) {
					this.tipoSelected = tipo;
				}
			});
		});*/
	}

	public initFields() {
		//grupo de formulario
		this.formGroup = this.fb.group({
			name: [
				this.sharedProducto == null ? '' : this.sharedProducto.name,
				[Validators.required, Validators.minLength(5), CustomValidators.LetterValidator]
			],
			description: [this.sharedProducto == null ? '' : this.sharedProducto.description, [Validators.required, Validators.minLength(5)]],
			price: [
				this.sharedProducto == null ? '' : this.sharedProducto.price,
				[Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidators.NumericValidator]
			],
			tipoId: ['', [Validators.required, CustomValidators.NumericValidator]],
			marcaId: ['', [Validators.required, CustomValidators.NumericValidator]],
			quantity: [this.sharedProducto == null ? '' : this.sharedProducto.quantity, [Validators.required, CustomValidators.NumericValidator]],
			imagePath: ['']
		});
	}
	public async getTipos(): Promise<void> {
		await lastValueFrom(this.tipoService.getAll()).then((response) => {
			this.tipos = response;
		});
	}

	public async registerProducto(): Promise<void> {
		let producto: ProductoRequestDto;
		if (this.formGroup.valid) {
			producto = this.formGroup.value;
			await lastValueFrom(this.productoService.save(producto))
				.then((response) => {
					Swal.fire({
						icon: 'success',
						title: `Producto ${response.name} creado`,
						showConfirmButton: true
					}).then(() => {
						this.goBack();
					});
				})
				.catch((err) => {
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

	public async updateProducto(): Promise<void> {
		let producto: ProductoRequestDto;
		if (this.formGroup.valid) {
			producto = this.formGroup.value;
			producto.id = this.sharedProducto.id;
			await lastValueFrom(this.productoService.update(producto))
				.then((response) => {
					Swal.fire({
						icon: 'success',
						title: `Producto ${response.name} actualizado`,
						showConfirmButton: true
					}).then(() => {
						this.router.navigate(['/admin/producto-detail'], { queryParams: { id: response.id } });
					});
				})
				.catch((err) => {
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
}
