import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './website/pages/login/login.component';
import { SignUpComponent } from './website/pages/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './website/pages/home/home.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { PageProductsComponent } from './website/pages/page-products/page-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'category/:id',
    canActivate: [AuthGuard],
    component: CategoryComponent
  },
  {
    path: 'product/:id',
    canActivate: [AuthGuard],
    component: PageProductsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrarse',
    component: SignUpComponent
  },
  {
    path: '**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
