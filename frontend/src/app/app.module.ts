import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// material
import {
  MdButtonModule,
  MdMenuModule,
  MdIconModule,
  MdToolbarModule,
  MdTooltipModule,
  MdCardModule,
  MdInputModule,
  MdIconRegistry,
  MdProgressSpinnerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LoginGuard, GuestGuard } from './guard';
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
  ConfigService
} from './service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './component/register/register.component';
import { DazzleusComponent } from './component/dazzleus/dazzleus.component';

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
    DazzleusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MdMenuModule,
    MdTooltipModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
    MdCardModule,
    MdProgressSpinnerModule,
    FlexLayoutModule
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    FooService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
    MdIconRegistry,
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
