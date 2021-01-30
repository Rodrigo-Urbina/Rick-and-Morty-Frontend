import { Component, Input, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {}

  resetCount():void{
    this.charactersService.pageNumber = 0;
  }
}
