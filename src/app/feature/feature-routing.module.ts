import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { inverseAuthGuard } from '../core/guards/inverse.auth.guard';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: "autenticacion",
    loadChildren: () => import("./auth/auth.module").then(f => f.AuthModule),
    canActivate: [inverseAuthGuard]
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(f => f.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(f => f.AdminModule)
  },
  { path: "", redirectTo: "autenticacion/inicio-sesion", pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
