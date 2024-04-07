import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { inverseAuthGuard } from '../core/guards/inverse.auth.guard';
import { permissionGuard } from '../core/guards/permission.guard';


const routes: Routes = [
  {
    path: 'autenticacion',
    loadChildren: () => import('./auth/auth.module').then((f) => f.AuthModule),
    canActivate: [inverseAuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((f) => f.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((f) => f.AdminModule),
    canActivate: [permissionGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
