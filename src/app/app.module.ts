import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

import { AppRoutingModule } from './app-routing.module';

//website/Componentes
import { AppComponent } from './app.component';
import { ImgComponent } from './website/components/img/img.component';
import { ProductComponent } from './website/components/product/product.component';
import { ProductsComponent } from './website/components/products/products.component';
import { NavComponent } from './website/components/nav/nav.component';
import { ProductDetailComponent } from './website/components/product-detail/product-detail.component';
import { CargandoComponent } from './website/components/cargando/cargando.component';
import { LoginComponent } from './website/pages/login/login.component';
import { SignUpComponent } from './website/pages/sign-up/sign-up.component';
import { HomeComponent } from './website/pages/home/home.component';


//Pipes
import { ReversePipe } from './website/pipes/reverse.pipe';
import { TimeAgoPipe } from './website/pipes/time-ago.pipe';
import { vocalChangePipe } from './website/pipes/vocal-change.pipe';
import { HighLightDirective } from './website/directives/high-light.directive';


//Interceptors
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { PageProductsComponent } from './website/pages/page-products/page-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './website/pages/category/category.component';
import { LayoutComponent } from './website/components/layout/layout/layout.component';


//Los interceptor tocan de ofrma manual

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar])
@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
