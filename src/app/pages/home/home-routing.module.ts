import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { HomeComponent } from './home.component';
import { PageProductsComponent } from 'src/app/components/page-products/page-products.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'products/:id',
      component: PageProductsComponent
    },
    {
      path: 'category/:id',
      component: ProductsComponent
    },
  ]
},
{
  path: '**',
  redirectTo: 'produtcs'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
