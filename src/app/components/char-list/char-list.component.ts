import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-list',
  templateUrl: './char-list.component.html',
  styleUrls: ['./char-list.component.scss'],
})
export class CharListComponent implements OnInit {
  @Input() element ;

  constructor() { }

  ngOnInit() {}

}
