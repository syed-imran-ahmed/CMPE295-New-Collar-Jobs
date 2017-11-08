import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayMessage } from '../shared/models/display-message';
import { Subscription } from 'rxjs/Subscription';
import {
  UserService,
  AuthService
} from '../service';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Login';
  githubLink = 'https://github.com/syed-imran-ahmed/CMPE295-New-Collar-Jobs';
  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Notification message from received
   * form request or router
   */
  notification: DisplayMessage;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResetCredentials() {
    this.userService.resetCredentials()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
      if (res.result === 'success') {
        alert('Password has been reset to 123 for all accounts');
      } else {
        alert('Server error');
      }
    });
  }

  repository() {
    window.location.href = this.githubLink;
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;

    this.authService.login(this.form.value)
    // show me the animation
    .delay(1000)
    .subscribe(data => {
      //const res = 
      this.userService.getMyInfo().subscribe(user =>{
        if(user.companyname==null){
          console.log(user);
          this.router.navigate(['/']);
        }
        else{
          console.log(user);
          this.router.navigate(['/change-password']);
        }
      });
     
    },
    error => {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: 'Incorrect username or password.' };
    });

  }


}
