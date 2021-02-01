import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { CHARACTER } from '../../../constants/interfaces/CHARACTER';
import { EPISODE } from '../../../constants/interfaces/EPISODE';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  id : number ;
  character: CHARACTER;
  characterDataLoaded!: Promise <boolean>;
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
              private episodesService: EpisodeService) { 

                
    this.actRoute.params.subscribe(data=>{
      this.id = data.id;
    });

  }

  ngOnInit() {
    this.getCharacterData();
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
          console.log(character);
          console.log(this.episodes);
      })
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

  


}
