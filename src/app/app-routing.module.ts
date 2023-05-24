import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './website/pages/login/login.component';
import { SignUpComponent } from './website/pages/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './website/pages/home/home.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { PageProductsComponent } from './website/pages/page-products/page-products.component';
import { LayoutComponent } from './website/components/layout/layout/layout.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
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
    ],
    canActivate: [AuthGuard],
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
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
