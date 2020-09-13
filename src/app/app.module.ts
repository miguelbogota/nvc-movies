import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
// Views
import { DiscoverComponent } from './views/trending/trending.component';
import { SearchComponent } from './views/search/search.component';
import { DetailsComponent } from './views/details/details.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ErrorComponent } from './views/error/error.component';
// Services
import { MovieService } from './core/services/movie/movie.service';
import { SeasonCardComponent } from './components/season-card/season-card.component';

@NgModule({
  declarations: [
    AppComponent,
    // Components
    NavbarComponent,
    CardComponent,
    SearchBarComponent,
    // Views
    DiscoverComponent,
    SearchComponent,
    DetailsComponent,
    SettingsComponent,
    ErrorComponent,
    SeasonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    InfiniteScrollModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
