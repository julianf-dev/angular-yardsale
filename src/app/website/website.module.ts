import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    PageProductsComponent,
    CategoryComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class WebsiteModule { }
