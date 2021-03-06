import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DisplayMessage } from '../../shared/models/display-message';
import {MatTabChangeEvent} from '@angular/material';
import {
  UserService,
  AuthService
} from '../../service';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'Sign Up';
  githubLink = 'https://github.com/syed-imran-ahmed/CMPE295-New-Collar-Jobs';
  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;
  tabindex = 0;

  /**
   * Notification message from received
   * form request or router
   */
  notification: DisplayMessage;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      jobtitle: ['', Validators.compose([ Validators.minLength(3), Validators.maxLength(32)])],
      companyname: ['', Validators.compose([ Validators.minLength(3), Validators.maxLength(32)])],
      emailid: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64),Validators.pattern(this.emailRegex)])],
      
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  repository() {
    window.location.href = this.githubLink;
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });

    this.form.reset();
    this.tabindex= tabChangeEvent.index;
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;
    
    if (this.tabindex==1)
    {
      this.authService.empRegister(this.form.value)
      .delay(1000)
      .subscribe(data => {
        //this.userService.getMyInfo().subscribe();
        this.router.navigate(['/login', { msgType: 'success', msgBody: 'Employer registration Successful! Please sign in.'}]);
      },
      error => {
        this.submitted = false;
        this.notification = { msgType: 'error', msgBody: 'Employer already exists with same username or emailid' };
      });
    }
    else
    {
      this.authService.register(this.form.value)
      // show me the animation
      .delay(1000)
      .subscribe(data => {
        //this.userService.getMyInfo().subscribe();
        this.router.navigate(['/login', { msgType: 'success', msgBody: 'User registration Successful! Please sign in.'}]);
      },
      error => {
        this.submitted = false;
        this.notification = { msgType: 'error', msgBody: 'User already exists with same username or emailid' };
      });
    }
  }

}
