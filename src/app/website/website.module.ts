import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';


//Pipes
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { vocalChangePipe } from './pipes/vocal-change.pipe';
import { HighLightDirective } from './directives/high-light.directive';


import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImgComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    vocalChangePipe,
    HighLightDirective,
    CargandoComponent,
    LoginComponent,
    SignUpComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailComponent,
    PageProductsComponent,
    CategoryComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class WebsiteModule { }
