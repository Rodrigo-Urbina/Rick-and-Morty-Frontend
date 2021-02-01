import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../../services/characters.service';
import { CHARACTER } from '../../../constants/interfaces/CHARACTER';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  id : number ;
  character: CHARACTER;
  characterDataLoaded!: Promise <boolean>;

  constructor(private charactersService : CharactersService,
              private actRoute : ActivatedRoute) { 

    this.actRoute.params.subscribe(data=>{
      this.id = data.id;
    });

  }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter(){
    this.charactersService.getCharacter(this.id)
      .subscribe(character =>{
        this.character = character;
        console.log(character);
        this.characterDataLoaded = Promise.resolve(true);
      })
  }

}
