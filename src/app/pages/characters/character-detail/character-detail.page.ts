import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { CHARACTER } from '../../../constants/interfaces/CHARACTER';
import { EPISODE } from '../../../constants/interfaces/EPISODE';
import { EpisodeService } from 'src/app/services/episode.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  id : number ;
  character: CHARACTER;
  characterDataLoaded!: Promise <boolean>;
  favorites : [number] = [1];
  episodes : [EPISODE] = [
    {id: 0,
    name: '',
    air_date: '',
    episode: '',
    characters: [''],
    url: '',
    created: '',}];

  constructor(private charactersService : CharactersService,
              private actRoute : ActivatedRoute,
              private episodesService: EpisodeService,
              private userService: UserService,
              private router: Router) { 

      this.actRoute.params.subscribe(data=>{
      this.id = data.id;
    });

  }

  ngOnInit() {
    this.getCharacterData();
    this.getFavorites();
  }

  getCharacterData(){
    this.episodes.pop();
    this.charactersService.getCharacter(this.id)
      .subscribe(character =>{
        this.character = character;

        this.character.episode.forEach(episode =>{
          this.episodesService.getEpisode(episode)
            .subscribe(episode =>{
              this.episodes.push(episode);
              this.characterDataLoaded = Promise.resolve(true);
            });
          });
      })
  }

  async getFavorites(){
    this.favorites.pop();
    (await this.userService.getFavorites())
      .subscribe(character =>{
        this.favorites.push(...character);
      });
  }

  markedAsFavorite(){
    if(this.favorites.includes(Number(this.id))){
      return true;
    }
    else{
      return false;
    }
  }

  status(status:string):string{
    let color : string;
    switch(status){
      case 'Alive':{
        color = 'green';
        break;
      }
      case 'Dead':{
        color = 'red';
        break;
      }
      default: {
        color = 'grey';
        break;
      }
    }
    return color;
  }

  markAsFavorite(){
    if(this.favorites.includes(Number(this.id))){
      const index = this.favorites.indexOf(Number(this.id));
      this.favorites.splice(index,1);

      const body = {'favorites': this.favorites};
      this.userService.putFavorites(body)
        .subscribe(res=>{
          console.log(res);
      });
    }
    else{
      this.favorites.push(Number(this.id));
      const body = {'favorites': this.favorites};
      this.userService.putFavorites(body)
        .subscribe(res=>{
          console.log(res);
        });
    }
  }

  gotofav(){
    this.router.navigateByUrl('/favorites');
  }


}
