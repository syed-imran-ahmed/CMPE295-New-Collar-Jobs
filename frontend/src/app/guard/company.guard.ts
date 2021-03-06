import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.currentUser.companyname) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
