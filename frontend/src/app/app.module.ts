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
  MatSliderModule,
  MatSliderChange,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatStepperModule,
  MatSelectModule,
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
  RecommendedjobsService,
  ConfigService,
  SearchService
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
import { TextboxDialogueComponent } from './component/user-profile/textbox-dialogue/textbox-dialogue.component';
import { ListDialogueComponent } from './component/user-profile/list-dialogue/list-dialogue.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ImageDialogueComponent } from './component/user-profile/image-dialogue/image-dialogue.component';

import { QuestionnaireComponent } from './component/questionnaire/questionnaire.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { SearchComponent } from './component/search/search.component';

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
    ProgressBarTwoComponent,
    TextboxDialogueComponent,
    ListDialogueComponent,
    ImageDialogueComponent,
    QuestionnaireComponent,
    UserHomeComponent,
    SearchComponent
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
    MatSliderModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    CompanyGuard,
    FooService,
    PostedjobService,
    RecommendedjobsService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
    SearchService,
    MatIconRegistry,
    UserprofileService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  entryComponents: [TextboxDialogueComponent, ListDialogueComponent, ImageDialogueComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
