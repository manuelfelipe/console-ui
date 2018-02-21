import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { get } from 'lodash';
import { UserManager } from '../shared/user/user.manager';
import { User } from '../shared/user/user';
import { ProjectManager } from '../shared/project/project.manager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;
  namespace: string;
  isProjectContextual = false;

  userSub: Subscription;
  routerSub: Subscription;
  namespaceSub: Subscription;

  constructor(private userManager: UserManager,
              private projectManager: ProjectManager,
              private router: Router) {
  }

  ngOnInit() {
    this.userSub = this.userManager.user
      .subscribe(user => this.user = user);

    this.namespaceSub = this.projectManager.namespace
      .subscribe(namespace => {
        this.namespace = namespace;

        // if namespace changed, if we're not at a project contextual page, navigate to /analyze
        if (this.namespace && !this.isProjectContextual) {
          // this.router.navigate(['/analyze']);
        }
      });

    // inspired (ok.. copy/pasted) from
    // https://hassantariqblog.wordpress.com/2017/02/26/angular2-retrieve-data-property-from-angular2-routes
    this.routerSub = this.router.events
      .subscribe(event => {
        if (event instanceof RoutesRecognized) {
          this.isProjectContextual = get(event, 'state.root.firstChild.children[0].data.isProjectContextual', false);
        } else if (event instanceof NavigationEnd) {
          let root = this.router.routerState.snapshot.root;

          while (root) {
            if (root.children && root.children.length) {
              root = root.children[0];
            } else if (root.data && root.data['isProjectContextual']) {
              this.isProjectContextual = root.data['isProjectContextual'];
              return;
            } else {
              return;
            }
          }
        } else {
          this.isProjectContextual = false;
        }
      });
  }

  logout(): void {
    this.userManager.destroy();
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }

    if (this.namespaceSub) {
      this.namespaceSub.unsubscribe();
    }
  }
}
