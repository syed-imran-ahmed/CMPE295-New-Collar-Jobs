import { Component, OnInit } from '@angular/core';
import {
  UserService,
  AuthService
} from '../../service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  searchTerm$ = new Subject<string>();
  submitted  = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) { 
  }

  onSearchClick(searchText: string)
  { 
    this.submitted = true;
    this.searchService.searchEntries(searchText)
    .subscribe(results => {
      this.searchService.searchData = results.content;
      this.router.navigate(['/']).then(()=>{
        this.submitted = false;
        this.router.navigate(['/search'])
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  isCompany(){
    if(this.userService.currentUser)
      return this.userService.currentUser.companyname!=null;
  }

  isUser(){
    if(this.userService.currentUser)
    {
      return this.userService.currentUser.companyname===null;
    }
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    return user.firstname + ' ' + user.lastname;
  }

}
