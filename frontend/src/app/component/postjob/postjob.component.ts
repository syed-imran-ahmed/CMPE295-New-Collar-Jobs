import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DisplayMessage } from '../../shared/models/display-message';
import {MatTabChangeEvent} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {
  UserService,
  AuthService
} from '../../service';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.scss']
})
export class PostjobComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    this.form = this.formBuilder.group({
      ques1: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      ques2: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      ques3: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      ques4: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
      ques5: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(6)])],
      ques6: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  
  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    
    
    // this.notification = undefined;
     this.submitted = true;
    this.authService.postjob(this.form.value)
     // show me the animation
    .delay(1000)
    .subscribe(data => {
      let snackBarRef = this.snackBar.open('Job has been posted', 'OK',{
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
        snackBarRef.dismiss();
        this.router.navigate(['/company-home']);      
      });
    //this.userService.getMyInfo().subscribe();
       //this.router.navigate(['/login', { msgType: 'success', msgBody: 'User registration Successful! Please sign in.'}]);
    },
    error => {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: 'User already exists with same username or emailid' };
    });
    }
}
