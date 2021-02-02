import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CharactersService } from '../../../services/characters.service';
import { CHARACTER } from '../../../constants/interfaces/CHARACTER';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites = [] ;
  characters : [CHARACTER] ;

  constructor(private userService : UserService,
              private charactersService : CharactersService,
              private router: Router) {             
                
      router.events.subscribe((val)=>{
        if(val instanceof NavigationEnd){
          this.ngOnInit();
        }
      });
               }

  ngOnInit() {
    const userData = this.userService.userData();
    this.getFavorites();
  }

  async getFavorites(){
    this.favorites.pop();
    (await this.userService.getFavorites())
      .subscribe(character =>{
        this.favorites = character;
        console.log('favoritos desde usuario:');
        console.log(this.favorites);
        this.getCharacters(this.favorites);
      });
  }

  getCharacters(fav){
    this.charactersService.getCharactersArray(fav)
      .subscribe(character=>{
        this.characters = character;
        console.log(this.characters);
      })
  }

  
}
