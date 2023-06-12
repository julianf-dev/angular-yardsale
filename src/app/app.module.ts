import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

import { AppRoutingModule } from './app-routing.module';

//website/Componentes
import { AppComponent } from './app.component';

//Interceptors
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthGuard } from './guards/auth.guard';

import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';


//Los interceptor tocan de ofrma manual

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar])
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
