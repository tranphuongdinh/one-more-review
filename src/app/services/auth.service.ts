import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  token: any;

  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public isAuthenticated(): boolean {
    const accessTokenPayload: any = localStorage.getItem(this.ACCESS_TOKEN);
		const idPayload:any = localStorage.getItem('USER_ID');

    if (accessTokenPayload && accessTokenPayload !== '' && idPayload && idPayload !== '') {
			return true
		} else {
			return false;
		}
  }

  signOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
		localStorage.removeItem('USER_ID');
    this.router.navigate(['authenticate']);
  }
}
