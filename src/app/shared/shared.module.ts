import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighLightDirective } from './directives/high-light.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CargandoComponent } from './components/cargando/cargando.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';



@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighLightDirective,
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    CargandoComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    FontAwesomeModule,
    RouterModule,
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighLightDirective,
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    CargandoComponent,
    ProductDetailComponent

  ]
})
export class SharedModule { }
