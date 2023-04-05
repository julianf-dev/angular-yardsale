import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { HomeComponent } from './home.component';
import { CategoryComponent } from '../category/category.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'category:id',
      component: CategoryComponent
    },
  ]
},
{
  path: '**',
  redirectTo: 'home/products'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
