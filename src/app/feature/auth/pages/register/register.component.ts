import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthRegisterRequestDto } from 'src/app/core/dto/cliente/authRegisterRequestDto';
import { RegisterService } from 'src/app/core/service/register.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import {
  crossPasswordValidator,
  CustomValidators,
  PasswordStateMatcher,
} from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends AppBaseComponent implements OnInit {
  public formGroup: FormGroup;
  public passwordStateMatcher = new PasswordStateMatcher();
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.initFormFields();
  }

  public initFormFields() {
    this.formGroup = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidators.LetterAndNumericValidator,
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, CustomValidators.EmailValidator]],
        telephone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            CustomValidators.NumericValidator,
          ],
        ],
        address: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        validators: [crossPasswordValidator],
      }
    );
    /*Opcion de creacion del form control sin el FormBuilder
    this.formGroup = new FormGroup({
      username: new FormControl('', { validators: [Validators.required, Validators.minLength(5), CustomValidators.LetterAndNumericValidator] })
      ,password: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] }),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, CustomValidators.EmailValidator]),
      telephone: new  FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), CustomValidators.NumericValidator]),
      address: new FormControl ('', [Validators.required, Validators.minLength(4)])
    },{validators: [CustomValidators.MatchValidator('password', 'repeatPassword')]});*/
  }

  public async register(): Promise<void> {
    let registerDto: AuthRegisterRequestDto; //= this.formGroup.value;
    if (this.formGroup.valid) {
      registerDto = {
        username: this.formGroup.controls['username'].value,
        password: this.formGroup.controls['password'].value,
        email: this.formGroup.get('email').value,
        telephone: this.formGroup.get('telephone').value,
        address: this.formGroup.get('address').value,
      };
      await lastValueFrom(this.registerService.register(registerDto))
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: `Cliente con nombre de usuario ${response.username} registrado correctamente`,
            showConfirmButton: true,
          }).then(() => {
            this.router.navigate(['/autenticacion/inicio-sesion']);
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.detail,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay herrores en el formulario',
      });
    }
    //console.log('Errores:', JSON.stringify(this.getFormErrors(this.formGroup)));
  }
}
