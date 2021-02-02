import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../../services/characters.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    const userData = this.charactersService.userData();
    console.log(userData);
  }

  
}
