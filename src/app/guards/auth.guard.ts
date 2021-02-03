import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenGuardService } from '../services/token-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenGuard: TokenGuardService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //Evaluate if token is Expired
    if(!this.tokenGuard.isAuthenticated()) {
      this.router.navigate([''])
      return false;
    }
    return true;
  }
  
}
