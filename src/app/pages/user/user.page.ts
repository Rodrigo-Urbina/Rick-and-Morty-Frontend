import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { TokenGuardService } from 'src/app/services/token-guard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  
  id: number;
  character: CHARACTER;
  favorites = [];
  user: any;


  constructor(private charactersService: CharactersService,
              private router: Router,
              private authService: AuthService, 
              private tokenGuardService: TokenGuardService) {  }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.user = this.tokenGuardService.getUserData();
    if(this.user === '') {
      console.log("Invalid token");
    } else {
      console.log(this.user);
    }
  }

  logOut() {
    localStorage.removeItem("currentUser");
  }
}
