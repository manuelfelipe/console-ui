import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager } from '../shared/user/user.manager';
import { BitbucketService } from '../shared/bitbucket/bitbucket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private userManager: UserManager,
              private bitbucketService: BitbucketService) {
  }

  ngOnInit() {
    this.userManager.user
      .filter(user => !!user)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, err => console.error(err));
  }

  login(): void {
    this.bitbucketService.login();
  }
}
