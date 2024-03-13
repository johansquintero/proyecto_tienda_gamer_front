import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { AuthService } from 'src/app/core/service/auth.service';
import { lastValueFrom } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';
import { AuthLoginDto } from 'src/app/core/dto/cliente/authLoginDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {
  public logForm: FormGroup;
  /**
   * constructor
   * @param router gestos de runtas
   * @param fb constructor del grupo de inputs del formulario
   * @param authService servicio de seguridad
   * @param tokenService servicio del token JWT
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService) {
    super();
    this.initFormFields();
  }

  public initFormFields() {
    this.logForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  /**
   * Funcion asincrona que realiza el login
   * valida los campos del formulario
   * hace la lectura de los campos del grupo del formularios
   * crea el objeto de loginDto con los datos
   * se envia el cuerpo al servicio de login
   * se aplica el await para esperar la operacion del observable 
   */
  public async logIn(): Promise<void> {
    let loginDto: AuthLoginDto;
    if (this.logForm.valid) {
      let username = this.logForm.get('username').value;
      let password = this.logForm.get('password').value;
      loginDto = { username, password };

      await lastValueFrom(this.authService.login(loginDto)).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.detail
        });
      });
      console.log(`token:${this.tokenService.getToken()}`);
      await this.router.navigateByUrl("/home");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario'
      });
    }

    //console.log('Errores:', JSON.stringify(this.getFormErrors(this.logForm), null, 2));
  }

}
