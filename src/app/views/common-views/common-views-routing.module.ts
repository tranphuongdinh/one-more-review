import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { FilmComponent } from './film/film.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { AddAdminComponent } from './add-admin/add-admin.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authenticate',
    component: AuthenticateComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'filter-result',
    component: FilterResultComponent,
  },
  {
    path: 'films/:id',
    component: FilmComponent,
  },
  {
    path: 'add-film',
    component: AddFilmComponent,
  },
  {
    path: 'edit-film/:id',
    component: EditFilmComponent,
  },
	{
		path: 'add-admin',
		component: AddAdminComponent,
	},
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonViewsRoutingModule {}
