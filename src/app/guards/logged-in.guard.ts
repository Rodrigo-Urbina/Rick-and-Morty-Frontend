import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenGuardService } from '../services/token-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private tokenGuardService: TokenGuardService, 
              private router: Router) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(!this.tokenGuardService.isLoggedIn()){
      return true;
    } 
    this.router.navigate(['characters']);
    return false;
  }
  
}
