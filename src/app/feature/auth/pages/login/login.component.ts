import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { AuthLoginDto } from 'src/app/core/dto/cliente/AuthLoginDto';
import { AuthService } from 'src/app/core/service/auth.service';
import { AuthJwtDto } from 'src/app/core/dto/cliente/AuthJwtDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent {
  public logForm: FormGroup;
  constructor(private router:Router,private fb: FormBuilder,private authService:AuthService) {
    super();
    this.initFormFields();
  }

  public initFormFields(){
    this.logForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  public logIn(): void {
    let loginDto:AuthLoginDto;
    if (this.logForm.valid) {
      let username = this.logForm.get('username').value;
      let password = this.logForm.get('password').value;  
      loginDto= {username,password};
      let jwt=this.authService.login(loginDto).subscribe({
        next:value=>{
          console.log(value.jwt);
        }
      });
    }

    //console.log('Errores:', JSON.stringify(this.getFormErrors(this.logForm), null, 2));
  }

  public getErrorField(field: string): string {
    let message;
    if (this.isTouchedField(this.logForm, field)) {
      if (this.logForm.get(field).hasError('required')) {
        message = 'El campo es requerido';
      }else if (this.logForm.get(field).hasError('minlength')) {        
        message = 'El campo debe tener mas caracteres';
      }
    }
    return message;
  }
}
