import { Component, OnInit } from '@angular/core';
import { CHARACTER } from 'src/app/constants/interfaces/character';
import { PAGE } from 'src/app/constants/interfaces/page';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  pageNumber : number = 1;
  page: PAGE;
  characters : [CHARACTER] ;

  constructor(private characterService: CharactersService) { }

  ngOnInit() {
    this.getCharacters();
  }

   getCharacters(event?){
    this.characterService.getCharacters()
      .subscribe( page=>{
        this.page = page;
        
        if(this.characters === undefined){
          this.characters = page.results;
        }
        else{
         this.characters.push(...page.results) 
        }

        if(this.page.info.next==='http://localhost:3000/characters?page=11'){
          event.target.disabled = true;
          return;
        }

        if(event){
          event.target.complete();
        }
      },
      err =>{
        console.log(err);
      });
  }

  loadData(event){
    this.getCharacters(event)
  }


}
