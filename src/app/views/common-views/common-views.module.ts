import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonViewsRoutingModule } from './common-views-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmComponent } from './film/film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    PageNotFoundComponent,
    HomePageComponent,
    DashboardComponent,
    UserComponent,
    ReviewPageComponent,
    AuthenticateComponent,
    ForgotPasswordComponent,
    FilterResultComponent,
    FilmComponent,
    EditFilmComponent,
    AddFilmComponent,
    AddAdminComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CommonViewsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
		CarouselModule,
		ButtonModule,
		RatingModule,
		SkeletonModule,
		ToolbarModule,
		ConfirmPopupModule,
		DialogModule,
		PasswordModule,
  ],
})
export class CommonViewsModule {}
