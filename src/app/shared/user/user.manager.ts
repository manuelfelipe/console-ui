import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

import { User } from './user';

@Injectable()
export class UserManager {
  user: Observable<User>;
  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private localStorageService: LocalStorageService) {
    this.user = this.subject.asObservable();
    this.updateUser(this.localStorageService.get<User>('user'));
  }

  updateUser(user: User): void {
    this.localStorageService.set('user', user);
    this.subject.next(user);
  }

  destroy(): void {
    this.updateUser(null);
    this.localStorageService.clearAll();
  }

}
