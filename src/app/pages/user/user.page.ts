import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { AuthService } from 'src/app/services/auth.service';
import { CharactersService } from 'src/app/services/characters.service';
import { TokenGuardService } from 'src/app/services/token-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  
  id: number;
  characters: [CHARACTER];
  favorites = [];
  user: any;


  constructor(private charactersService: CharactersService,
              private router: Router,
              private authService: AuthService, 
              private tokenGuardService: TokenGuardService, 
              private userService: UserService) {  }

  ngOnInit() {
    this.getProfileData();
    this.getFavorites();
  }

  getProfileData() {
    this.user = this.tokenGuardService.getUserData();
    if(this.user === '') {
      console.log("Invalid token");
    } else {
      console.log(this.user);
    }
  }

  async getFavorites() {
    (await this.userService.getFavorites()).subscribe((data) => {
      this.favorites = data;
      this.getCharacters(this.favorites);
    })
  }

  getCharacters(fav){
    this.charactersService.getCharactersArray(fav).subscribe((data) => {
      console.log(data);
      this.characters = data;
    })
  }

  logOut() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['']);
  }
}
