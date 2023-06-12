import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:id',
        component: CategoryComponent,
      },
      {
        path: 'product/:id',
        component: PageProductsComponent,

      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
