import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthRegisterRequestDto } from 'src/app/core/dto/cliente/authRegisterRequestDto';
import { RegisterService } from 'src/app/core/service/register.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/customValidators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent {
  public formGroup: FormGroup;
  public passwordGenerated: string;
  public registered: boolean;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    super();
    this.registered = false;
    this.initFormFields();
  }

  public initFormFields() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), CustomValidators.LetterAndNumericValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, CustomValidators.EmailValidator]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), CustomValidators.NumericValidator]],
      address: ['', [Validators.required, Validators.minLength(4)]]
    },
      {
        validators: [CustomValidators.MatchValidator('password', 'repeatPassword')]
      })
  }

  public async register(): Promise<void> {
    let registerDto: AuthRegisterRequestDto //= this.formGroup.value;
    if (this.formGroup.valid) {
      registerDto = {
        username: this.formGroup.get('username').value,
        password: this.formGroup.get('password').value,
        email: this.formGroup.get('email').value,
        telephone: this.formGroup.get('telephone').value,
        address: this.formGroup.get('address').value
      }
      console.log(registerDto);

      await lastValueFrom(this.registerService.register(registerDto)).then(reponse => {
        this.passwordGenerated = reponse.password;
        Swal.fire({
          icon: 'success',
          title: 'Cliente registrado correctamente',
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
      this.registered = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay herrores en el formulario'
      });
      this.formGroup.markAllAsTouched();
    }
    //console.log('Errores:', JSON.stringify(this.getFormErrors(this.formGroup)));
  }
}
