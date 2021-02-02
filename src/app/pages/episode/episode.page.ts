import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../services/episode.service';
import { EPISODE } from '../../constants/interfaces/EPISODE';
import { CHARACTER } from '../../constants/interfaces/CHARACTER';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage implements OnInit {
  id: number;
  episode: EPISODE;
  characterDataLoaded!: Promise <boolean>;
  season : string ;
  episodeNumber : string;
  characters : [CHARACTER] = [{
    id: 1,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [''],
    url: '',
    created: '',
  },]

  constructor(private actRoute : ActivatedRoute,
              private episodeService: EpisodeService,
              private charactersService: CharactersService) { 
    this.actRoute.params.subscribe(data=>{
    this.id = data.id;});
  }
  
  ngOnInit() {
    this.getEpisode(this.id);
  }

  getEpisode(id: number){
    this.episodeService.getEpisodeById(id)
      .subscribe(data=>{
        this.episode = data;
        this.season = this.episode.episode.substring(2,3);
        this.episodeNumber = this.episode.episode.substring(4,6);
        console.log(this.episode);

        this.episode.characters.forEach(character=>{
          this.characters.pop();
          this.charactersService.getCharacterByURL(character)
          .subscribe(data =>{
             this.characters.push(data);            
             this.characterDataLoaded = Promise.resolve(true);
          });
        });
      });
  }

  loadData(event){
    
  }

}
