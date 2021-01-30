import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'character-detail/:id',
    loadChildren: () => import('./pages/characters/character-detail/character-detail.module').then( m => m.CharacterDetailPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/characters/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/characters/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
