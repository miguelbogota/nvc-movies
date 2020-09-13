import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Views
import { DiscoverComponent } from './views/trending/trending.component';
import { SearchComponent } from './views/search/search.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ErrorComponent } from './views/error/error.component';
import { DetailsComponent } from './views/details/details.component';

const routes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'search', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'show/:showId/:seasonNumber', component: DetailsComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
