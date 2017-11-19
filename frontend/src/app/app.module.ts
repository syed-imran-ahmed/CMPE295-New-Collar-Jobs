import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// material
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatIconRegistry,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LoginGuard, GuestGuard, CompanyGuard } from './guard';
import { NotFoundComponent } from './not-found';
import { AccountMenuComponent } from './component/header/account-menu/account-menu.component';
import {
  HeaderComponent,
  ApiCardComponent,
  FooterComponent
} from './component';

import {
  ApiService,
  AuthService,
  UserService,
  FooService,
  PostedjobService,
  ConfigService
} from './service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './component/register/register.component';
import { DazzleusComponent } from './component/dazzleus/dazzleus.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PostjobComponent } from './component/postjob/postjob.component';
import { UserProfileComponent } from './component/user-profile/user-profile/user-profile.component';
import { ProgressBarOneComponent } from './component/user-profile/progress-bar-one/progress-bar-one.component';
import { CompanyHomeComponent } from './home/company-home/company-home.component';
import { JobCardComponent } from './component/job-card/job-card.component';
import { ProgressBarTwoComponent } from './component/user-profile/progress-bar-two/progress-bar-two.component';
import {UserprofileService} from "./service/userprofile.service";

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApiCardComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    RegisterComponent,
    DazzleusComponent,
    ProfileComponent,
    PostjobComponent,
    UserProfileComponent,
    ProgressBarOneComponent,
    CompanyHomeComponent,
    JobCardComponent,
    ProgressBarTwoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    CompanyGuard,
    FooService,
    PostedjobService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
    MatIconRegistry,
    UserprofileService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
