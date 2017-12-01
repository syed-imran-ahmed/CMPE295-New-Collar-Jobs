import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LoginGuard } from './guard';
import { GuestGuard } from './guard';
import { CompanyGuard } from './guard';
import { NotFoundComponent } from './not-found';
import { ChangePasswordComponent } from './change-password';
import { RegisterComponent } from './component/register';
import { ProfileComponent } from './component/profile';
import { PostjobComponent } from './component/postjob';
import { UserProfileComponent } from './component/user-profile/user-profile/user-profile.component';
import { CompanyHomeComponent } from './home/company-home';
import { UserHomeComponent } from './home/user-home';
import { QuestionnaireComponent } from './component/questionnaire/questionnaire.component';
import { SearchComponent } from './component/search/search.component';
import { ApplyjobComponent } from './component/applyjob/applyjob.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'postjob',
    component: PostjobComponent,
    canActivate: [CompanyGuard]
  },
  {
    path: 'edit-profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'company-home',
    component:CompanyHomeComponent,
    canActivate: [CompanyGuard]
  },
  {
    path:'user-home',
    component:UserHomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'questionnaire',
    component:QuestionnaireComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'search',
    component:SearchComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'apply',
    component:ApplyjobComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
