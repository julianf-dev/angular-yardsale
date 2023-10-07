import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ExitGuard } from './guards/exit.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrarse',
    component: SignUpComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: 'website',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    canActivate: [AuthGuard],
    data: {
      preload: true
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
