import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'character-detail/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/characters/character-detail/character-detail.module').then( m => m.CharacterDetailPageModule)
  },
  {
    path: 'characters',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/characters/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/characters/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'login',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'episode/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/episode/episode.module').then( m => m.EpisodePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
