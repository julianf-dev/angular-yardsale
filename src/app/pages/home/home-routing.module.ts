import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';

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
      component: ProductDetailComponent
    },
    {
      path: 'category/:id',
      component: ProductsComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
