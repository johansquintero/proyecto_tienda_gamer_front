import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
    title: 'Iniciar sesion',
  },
  {
    path: 'registro',
    component: RegisterComponent,
    title: 'Registrarse',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
