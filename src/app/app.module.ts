import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlreadyLoggedInActivateGuard, LoggedInActivateGuard } from '@guards';
import { SharedDomainModule } from 'src/domain/shared.domain.module';
import { environment } from 'src/environments/environment';
import { AuthService, MockAuthService } from '@services';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieRecommendationComponent } from './movie-recommendation/movie-recommendation.component';
import { MyRentalsComponent } from './my-rentals/my-rentals.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TokenBearerInterceptor } from 'src/domain/interceptors/token.bearer.interceptor';
import { TokenRefreshInterceptor } from '@interceptors';
import { UserWalletIndicatorComponent } from './user-wallet-indicator/user-wallet-indicator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MovieTileComponent } from './movie-tile/movie-tile.component';
import { DefaultImage } from 'src/domain/directives/default.image';
import { MatDialogModule } from '@angular/material/dialog';
import { MovieDetailsDialog } from 'src/domain/dialogs/movie-details-dialog/movie-details.dialog';
import { CategoryBubblesComponent } from './category-bubbles/category-bubbles.component';
import { RentalGridComponent } from './rental-grid/rental-grid.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

/**
 * add facade service for user service
 * add carousel or see how hard it would be to create a carousel component
 * add read me instructions
 */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    HomeComponent,
    NavbarComponent,
    MovieRecommendationComponent,
    MyRentalsComponent,
    UserWalletIndicatorComponent,
    MovieTileComponent,
    MovieDetailsDialog,
    DefaultImage,
    CategoryBubblesComponent,
    RentalGridComponent,
  ],
  imports: [
    SharedDomainModule.configure(
      environment.mockMode ? MockAuthService : AuthService
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenBearerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefreshInterceptor,
      multi: true,
    },
    LoggedInActivateGuard,
    AlreadyLoggedInActivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
