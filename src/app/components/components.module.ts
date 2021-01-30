import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CharListComponent } from './char-list/char-list.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [
    HeaderComponent, 
    CharListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent, 
    CharListComponent
  ]
})
export class ComponentsModule { }
