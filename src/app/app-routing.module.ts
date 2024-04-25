import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { LoggedInActivateGuard } from 'src/domain/guards/activate/logged.in.activate.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlreadyLoggedInActivateGuard } from '@guards';
import { MyRentalsComponent } from './my-rentals/my-rentals.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedInActivateGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInActivateGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyLoggedInActivateGuard],
  },
  {
    path: 'my-rentals',
    component: MyRentalsComponent,
    canActivate: [LoggedInActivateGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [LoggedInActivateGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
